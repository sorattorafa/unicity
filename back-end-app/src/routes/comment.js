'use strict';

// control and route

const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment-controller');

// get functions (by id and data)
router.get('/', controller.get);

// post, put and delete (create, update and delete)
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
