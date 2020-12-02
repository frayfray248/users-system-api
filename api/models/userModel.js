// mongoose
const mongoose = require('mongoose');
const db = mongoose.connection;

// model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

const User = mongoose.model('user', userSchema);

// export
module.exports = User;
