'use strict'; 
  
// control and route  

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/category-controller'); 

// get functions (by id and data)
router.get('/', controller.get); 
router.get('/:id', controller.getById);    

// post, put and delete (create, update and delete)
router.post('/', controller.post); 
router.put('/:id', controller.put); 
router.delete('/', controller.delete); 

module.exports = router;
