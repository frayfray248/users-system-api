/*
* This router is for accessing user resources
*/

//imports
const express = require('express');
const UsersController = require('../controllers/UsersController');

//instances
const router = express.Router();

// get all users
router.get('/', UsersController.getUsers);

//export
module.exports = router;