// imports
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users-systems-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});