// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// db
const db = mongoose.connection;

// models
const User = require('../models/userModel');

// get all users
exports.getUsers = (req, res, next) => {
    (async () => {
        await res.send({ response: "users" }).status(200);
    })();
};

// log a user in
exports.logUserIn = (req, res, next) => {
    (async () => {
        try {
            // find user
            const user = await User.find({
                email: req.body.email,
                username: req.body.username
            });

            if (user.length < 1) throw new Error('Authorization failed');

            // password check
            const auth = await bcrypt.compare(req.body.password, user[0].password);

            if (!auth) throw new Error('Authorization failed');

            // json token
            const token = await jwt.sign({
                username: user[0].username,
                email: user[0].email,
                userId: user[0]._id
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );

            // authorization successful
            // send token to client
            res.status(200).send({ 
                message: "authorization successful",
                token: token
            })

            // error handling
        } catch (error) {

            console.log(error);

            const errorMessage = error.message;

            // failed authorization error
            if (errorMessage === 'Authorization failed') {
                await res.status(401).send({ message: errorMessage })
            }
            // all other errors
            else {
                await res.status(500).send({ message: errorMessage });
            }

        }
    })();
};

// add a single user
exports.addUser = (req, res, next) => {
    (async () => {
        try {

            // exisitng email check
            const existingEmailUser = await User.find({ email: req.body.email }).exec();

            if (existingEmailUser.length > 0) {
                throw new Error('Email exists');
            }

            // exisitng username check
            const existingUsernameUser = await User.find({ username: req.body.username }).exec();

            if (existingUsernameUser.length > 0) {
                throw new Error('Username exists');
            }

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
        } catch (error) {

            console.log(error);

            const errorMessage = error.message;

            // validation error
            if (error instanceof mongoose.Error.ValidationError) {
                await res.status(400).send({ message: errorMessage })
            }
            // existing email error
            else if (errorMessage === 'Email exists') {
                await res.status(409).send({ message: errorMessage })
                // failed authorization error
            } else if (errorMessage === 'Authorization failed') {
                await res.status(401).send({ message: errorMessage })
            }
            // all other errors
            else {
                await res.status(500).send({ message: errorMessage });
            }


        }
    })();
}