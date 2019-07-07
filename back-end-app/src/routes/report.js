'use strict'; 
  
// control and route of report 

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/report-controller'); 

// get functions (by id and data)
router.get('/', controller.get);   
router.get('/:id', controller.getById);  
router.get('/byuser/:id', controller.getBySimpleuser);   
router.get('/bycategory/:id', controller.getByCategory);  
router.get('/bysolver/:id', controller.getBySolver);  

// post, put and delete (create, update and delete)
router.post('/add', controller.post); 
router.put('/:id', controller.put);  
router.put('/updatelike/:id/:num', controller.putlike); 
router.put('/updatedeslike/:id/:num', controller.putdeslike);  
router.delete('/', controller.delete); 

module.exports = router;
