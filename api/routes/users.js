/*
* This router is for accessing user resources
*/

//imports
const express = require('express');
const UsersController = require('../controllers/UsersController');

//instances
const router = express.Router();

// routes
router.post('/signUp', UsersController.addUser);
router.post('/login', UsersController.logUserIn);
router.delete('/:userId', UsersController.delete);

//export
module.exports = router;