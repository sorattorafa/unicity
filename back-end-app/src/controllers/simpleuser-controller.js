'use strict';      

// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of product 
const repository = require('../repositories/simpleuser-repository');  

exports.get = async (req, res, next) =>{ 
    try {
        var data = await repository.get(); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
}; 

// Get simple users by id 
exports.getById = async (req, res, next) =>{ 
    try {
        var data = await repository.getById(req.params.id); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
};

// Get simple users by email 
exports.getByEmail = async (req, res, next) =>{ 
    try {
        var data = await repository.getByEmail(req.params.email); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
};

// Get simple users by email 
exports.getByOneEmail = async (req, res, next) =>{ 
    try {
        var data = await repository.getByOneEmail(req.params.email); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
}; 
  
// create / set / update / delete  

//post - create
exports.post = async(req, res, next) => {  
    let contract = new ValidationContract(); 
    contract.hasMinLen(req.body.cpf, 4, 'O numero da sala deve conter pelo menos 4 caracteres = f001') 
    contract.hasMinLen(req.body.name, 4, 'O nome deve conter pelo menos 4 caracteres') 
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres') 
 
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end(); 
        return;
    }  
    try{ 
        await repository.create(req.body);
        res.status(200).send({ 
            message: 'Requisição Cadastrada com sucesso!' 
        });
    } catch (e){ 
        res.status(500).send({ 
            message: 'Falha ao processar a requisição'
        })
    }
}; 
 
//put- update request
exports.put = (req, res, next) => {   
    let contract = new ValidationContract();    // Usado para fazer a validação de dados
    contract.isEmail(req.body.email, 'Digite um e-mail válido') 
    
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end();  // Manda mensagens de erros para tela
        return;
    }

    repository  
        .update(req.params.id, req.body)
        .then(x=>{ 
            res.status(200).send({ 
                message: 'Usuario atualizado com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'Usuario não atualizado!',  
                data: e 
            });
        });  
}; 

// delete - remove
exports.delete = (req, res, next) => {  
    repository.delete(req.params.id) 
        .then(x=>{ 
            res.status(200).send({ 
                message: 'Requisição removido com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'requisição não removida!',  
                data: e 
            });
        });  
};  

//Login
exports.login = async(req, res, next) => {   
    // console.log("email: " + req.params.email);
    // console.log("senha: " + req.params.password);
    let email = req.params.email;
    let password = req.params.password;
    let contract = new ValidationContract();    // Usado para fazer a validação de dados
    contract.isEmail(req.params.email, 'Digite um e-mail válido!') 
    
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end();  // Manda mensagens de erros para tela
        return;
    }

    try {
        var list_users = await repository.getByEmail(email);
        // console.log("users: " + list_users);
        if (list_users){
            list_users.map(simpleuser => {
                if (simpleuser.email === email){ 
                    if(simpleuser.password === password){
                        res.status(200).send(simpleuser);
                    }
                }
            });
        } else {
            res.status(401).send({ 
                message: 'Usuário não cadastrado.'
            });
        }
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }
}; 