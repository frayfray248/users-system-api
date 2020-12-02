// mongoose
const mongoose = require('mongoose');
const db = mongoose.connection;

// model
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

// export
module.exports = mongoose.model('User', userSchema);
