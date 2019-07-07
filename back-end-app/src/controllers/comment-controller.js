'use strict';

// validation
const ValidationContract = require('../validators/fluent-validator');
// repository of product
const repository = require('../repositories/comment-repository');

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

// Get comment by id 
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
    contract.isRequired(req.body.content, 'O comentario deve ter conteudo')

    // if data is valid
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create(req.body);
        res.status(201).send({
            message: 'Requisição cadastrada com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
};

// put - set
exports.put = (req, any, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.content, 'O comentario deve ter conteudo')
    
    const id = req.params.id;

    // if data is valid
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        // await repository.create(req.body);
        repository.create(req.body);
        res.status(200).send({
            id: id,
            item: req.body,
            message: 'Requisição cadastrada com sucesso!'
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
    contract.isRequired(req.body.content, 'O comentario deve ter conteudo')

    // if data is valid
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();  // Manda mensagens de erros para tela
        return;
    }

    repository
        .update(req.params.id, req.body)
        .then(x=>{
            res.status(201).send({
                message: 'Comentario atualizado com sucesso!'
            });
        }).catch(e=>{
            res.status(400).send({
                message: 'Comentario nao atualizado!',
                data: e
            });
        });
};

// delete
exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
        .then(x=>{
            res.status(200).send({
                message: 'Comentario removido com sucesso!'
            });
        }).catch(e=>{
            res.status(400).send({
                message: 'Comentario nao removido!',
                data: e
            });
        });
};
