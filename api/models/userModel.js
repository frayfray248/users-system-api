// mongoose
const mongoose = require('mongoose');
const db = mongoose.connection;

// model
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// export
module.exports = mongoose.model('User', userSchema);
