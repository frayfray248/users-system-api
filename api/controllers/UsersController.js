// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// db
const db = mongoose.connection;

// models
const User = require('../models/userModel');

// error handler function
const handleError = async (code, message, res) => {
    res.status(code).json({ message })
}

// log a user in
exports.logUserIn = (req, res, next) => {
    (async () => {
        try {

            // find user
            const user = await User.find({
                username: req.body.username
            });

            // no user found check
            if (user.length < 1) throw ({ code: 401, message: 'Authorization failed' });

            // password check
            const auth = await bcrypt.compare(req.body.password, user[0].password);

            if (!auth) throw ({ code: 401, message: 'Authorization failed' });

            // json token
            const jwtPayLoad = {
                username: user[0].username,
                email: user[0].email,
                userId: user[0]._id
            }

            const token = await jwt.sign(
                jwtPayLoad,
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );

            // succeed authorization and send token
            res.status(200).send({
                message: "authorization successful",
                token: token
            })

            // error handling
        } catch (error) {

            // error message and log
            const message = error.message;
            console.log(message);

            // failed authorization
            if (message === 'Authorization failed') {
                await handleError(error.code, message, res)
            }
            // custom errors
            else if (error.code && message) {
                await handleError(error.code, message, res)
            }
            // all other errors
            else {
                next(error);
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

            if (existingEmailUser.length > 0) throw { code: 409, message: 'Email exists' }

            // exisitng username check
            const existingUsernameUser = await User.find({ username: req.body.username }).exec();

            if (existingUsernameUser.length > 0) throw { code: 409, message: 'Username exists' }

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

            // error message and log
            const message = error.message;
            console.log(message);

            // invalidation
            if (error instanceof mongoose.Error.ValidationError) {
                await handleError(400, message, res)
            }
            // custom errors
            else if (error.code && message) {
                await handleError(error.code, message, res)
            }
            // all other errors
            else {
                next(error)
            }


        }
    })();
}

exports.delete = (req, res, next) => {
    (async () => {
        try {

            const userId = req.params.userId;

            // find user
            const user = await User.findById(userId).exec();

            // no user found check
            if (!user) throw { code: 404, message: 'User not found'};

            // delete user
            await User.remove({ _id: userId });

            // success
            res.status(204).send();

        } catch (error) {

            // error message and log
            const message = error.message;
            console.log(message);

            // custom errors
            if (error.code && message) {
                await handleError(error.code, message, res)
            }
            // all other errors
            else {
                next(error)
            }
        }
    })();
}