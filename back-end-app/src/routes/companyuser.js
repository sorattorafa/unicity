'use strict'; 
  
// control and route of companyuser 

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/companyuser-controller'); 

// get functions (by cnpj and data)
router.get('/', controller.get);
router.get('/:id', controller.getById);      
router.get('/:email', controller.getByEmail);    
router.get('/admin/:city', controller.getByCity);  
router.get('/categories/:category', controller.getByCategory); 

// post, put and delete (create, update and delete)
router.post('/add', controller.post); 
router.put('/:id', controller.put); 
router.delete('/:cnpj', controller.delete); 

module.exports = router;
