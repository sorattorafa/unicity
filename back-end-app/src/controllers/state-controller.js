'use strict';      

// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of product 
const repository = require('../repositories/state-repository');  

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

//post - create
exports.post = async(req, res, next) => {  
    let contract = new ValidationContract(); 
    contract.hasMinLen(req.body.name, 4, 'O nome deve conter pelo menos 4 caracteres') 
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end(); 
        return;
    }  
    try{ 
        await repository.create(req.body);
        res.status(201).send({ 
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
    contract.hasMinLen(req.body.name, 4, 'O nome deve conter pelo menos 4 caracteres')     
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end();  // Manda mensagens de erros para tela
        return;
    }

    repository  
        .update(req.params.id, req.body)
        .then(x=>{ 
            res.status(201).send({ 
                message: 'Estado atualizada com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'Estado não atualizado!',  
                data: e 
            });
        });  
}; 

 
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
