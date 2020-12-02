// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// db
const db = mongoose.connection;

// models
const User = require('../models/userModel');

// get all users
exports.getUsers = (req, res, next) => {
    (async () => {
        await res.send({ response: "users"}).status(200);
    })();
};

// add a single user
exports.addUser = (req, res, next) => {
    (async () => {
        try {

            // create new user model instance
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10)
            });

            // save new user model instance
            const savedUser = await newUser.save();

            // success response
            console.log(`New user created: ${savedUser}`)
            await res.status(201).send(savedUser);

        // error handling
        } catch(error) {

            console.log(error);
            
            const errorMessage = error.message;
            
            // validation error
            if (error instanceof mongoose.Error.ValidationError) {
                await res.status(400).send({message: errorMessage})
            // all other errors
            } else {
                await res.status(500).send({message: errorMessage});
            }
            
            
        }
    })();
}