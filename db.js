// imports
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users-systems-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log("Successfully connected to db")});