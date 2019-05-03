'use strict';      

// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of product 
const repository = require('../repositories/adminuser-repository');  

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
        res.status(201).send({ 
            message: 'Usuário administrador cadastrado com sucesso!' 
        });
    } catch (e){ 
        res.status(500).send({ 
            message: 'Falha ao processar a requisição!'
        })
    }
}; 
 
//put- update request
exports.put = (req, res, next) => {   
    let contract = new ValidationContract();    // Usado para fazer a validação de dados
    contract.isEmail(req.body.email, 'Digite um e-mail válido') 
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres')
    
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end();  // Manda mensagens de erros para tela
        return;
    }

    repository  
        .update(req.params.cpf, req.body)
        .then(x=>{ 
            res.status(201).send({ 
                message: 'Usuário administrador atualizado com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'Usuário administrador não atualizado!',  
                data: e 
            });
        });  
}; 

 
exports.delete = (req, res, next) => {  
    repository.delete(req.body.id) 
        .then(x=>{ 
            res.status(200).send({ 
                message: 'Usuário administrador removido com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'Usuário administrador não removido!',  
                data: e 
            });
        });  
};  