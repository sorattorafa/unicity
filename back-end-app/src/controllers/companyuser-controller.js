'use strict';      

// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of product 
const repository = require('../repositories/companyuser-repository');  

exports.get = async (req, res, next) =>{ 
    try {
        var data = await repository.get();  // Mostra todo o conteudo
        res.status(200).send(data);         // Envia mensagem com dados para tela
    } catch (e) { 
        res.status(500).send({              // Se deu erro, mandam mensagem para tela
            message: 'Falha ao processar sua requisição'
        });
    }    
}; 

// Get companyuser by id 
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
 
// Get company users by city
exports.getByCity = async (req, res, next) =>{ 
    try {
        var data = await repository.getByCity(req.params.city); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
}; 
  
// Get company users by category
exports.getByCategory = async (req, res, next) =>{ 
    try {
        var data = await repository.getByCategory(req.params.category); 
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
    let contract = new ValidationContract();    // Usado para fazer a validação de dados
    contract.hasMinLen(req.body.cnpj, 18, 'Cnpj precisa de 18 caracteres') 
    contract.isEmail(req.body.email, 'Digite um e-mail válido') 
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres') 
 
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end();  // Manda mensagens de erros para tela
        return;
    }  
    try{ 
        await repository.create(req.body);              // Cria com os dados recebidos
        res.status(201).send({                          // Envia mensagem de sucesso para tela
            message: 'Requisição Cadastrada com sucesso!' 
        });
    } catch (e){ 
        res.status(500).send({                          // Indica falha no servidor
            message: 'Falha ao processar a requisição'
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
 
// delete product  
exports.delete = (req, res, next) => {  
    // use function findOneAndRemove of Product  
    // and print mensage with sucess or error

    let contract = new ValidationContract();    // Usado para fazer a validação de dados
    contract.hasMinLen(req.body.cnpj, 18, 'Cnpj precisa de 18 caracteres')

    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end();  // Manda mensagens de erros para tela
        return;
    }

    repository.delete(req.body.cnpj) 
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
