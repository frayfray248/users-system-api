//imports
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
require('./db');

// dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// routes
const usersRoute = require('./api/routes/users');

// port
const port = process.env.PORT;

// instances
const app = express();
const server = http.createServer(app);

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// users route
app.use('/users', usersRoute);

// unimplemented routes message
app.use((req, res, next) => {
    res.send({ message: 'not found'}).status(404);
});

// error response
app.use((error, req, res, next) => {
    res.status(error.status) || 500;
    res.json({
        error: {
            message: error.message
        }
    })
});

// start server
server.listen(port, () => console.log(`Listening on ${port}`));