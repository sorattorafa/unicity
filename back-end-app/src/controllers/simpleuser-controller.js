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
            message: 'Requisição Cadastrada com sucesso!' 
        });
    } catch (e){ 
        res.status(500).send({ 
            message: 'Falha ao processar a requisição'
        })
    }
}; 
 
// put - set 
exports.put = (req, any, next) => { 
    const cpf = req.params.cpf; 
    res.status(200).send({ 
        cpf: cpf, 
        item: req.body 
    });     
}; 
 
//put- update request
exports.put = (req, res, next) => {   
    // Product -> function to find by id params and update 
    // update ./port/request/id 
    repository  
        .update(req.params.cpf, req.body)
        .then(x=>{ 
            res.status(201).send({ 
                message: 'Sala atualizado com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'Sala não atualizado!',  
                data: e 
            });
        });  
}; 
 
// delete product  
exports.delete = (req, res, next) => {  
    // use function findOneAndRemove of Product  
    // and print mensage with sucess or error  
    repository.delete(req.body.numero) 
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
