'use strict'; 
  
// control and route of companyuser 

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/companyuser-controller'); 

// get functions (by cnpj and data)
router.get('/', controller.get);  

// post, put and delete (create, update and delete)
router.post('/', controller.post); 
router.put('/:cnpj', controller.put); 
router.delete('/:cnpj', controller.delete); 

module.exports = router;
