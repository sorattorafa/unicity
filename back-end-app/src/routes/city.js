'use strict'; 
  
// control and route of product 
const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/city-controller'); 

// get functions (by id and data)
router.get('/', controller.get);   

// post, put and delete (create, update and delete)
router.post('/add', controller.post); 
router.put('/:id', controller.put); 
router.delete('/delete/:id', controller.delete); 

module.exports = router;
