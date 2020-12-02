// imports
const mongoose = require('mongoose');
const db = mongoose.connection;
const User = require('../models/userModel');

// get all users
exports.getUsers = (req, res, next) => {
    (async () => {
        await res.send({ response: "users"}).status(200);
    })();
};