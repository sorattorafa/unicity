'use strict';      

// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of product 
const repository = require('../repositories/category-repository');  

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
 
// create / set / update / delete  

//post - create
exports.post = async(req, res, next) => {  
    let contract = new ValidationContract(); 
    contract.hasMinLen(req.body.name, 4, 'O nome deve conter pelo menos 4 caracteres') 
    contract.hasMinLen(req.body.description, 4, 'A senha deve conter pelo menos 4 caracteres') 
 
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
    repository  
        .update(req.params.id, req.body)
        .then(x=>{ 
            res.status(201).send({ 
                message: 'Categoria atualizado com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'Usuario não atualizado!',  
                data: e 
            });
        });  
};
 
// delete 
exports.delete = (req, res, next) => {  
    repository.delete(req.body.id) 
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
