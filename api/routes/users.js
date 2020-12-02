/*
* This router is for accessing user resources
*/

//imports
const express = require('express');
const UsersController = require('../controllers/UsersController');

//instances
const router = express.Router();

// routes
router.get('/', UsersController.getUsers);
router.post('/', UsersController.addUser);

//export
module.exports = router;