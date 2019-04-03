'use strict'; 
  
// control and route of simple user 

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/simpleuser-controller'); 

// get functions  
// create get (by cpf and others)
router.get('/', controller.get);  

// post, put and delete (create, update and delete)
router.post('/', controller.post); 
router.put('/:cpf', controller.put); 
router.delete('/', controller.delete); 

module.exports = router;
