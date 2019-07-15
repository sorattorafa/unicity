'use strict'; 
  
// control and route of product 

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/simpleuser-controller'); 
const SimpleUser = require('../routes/simpleuser');

// get functions (by id and data)
router.get('/', controller.get);
router.get('/:id', controller.getById);  
router.get('/email/:email', controller.getByEmail);
router.get('/oneemail/:email', controller.getByOneEmail);
// post, put and delete (create, update and delete)
router.post('/add', controller.post); 
router.put('/:id', controller.put); 
router.delete('/delete/:id', controller.delete);

// Faz login do usuário
router.post('/login/:email/:password', controller.login);

module.exports = router;
