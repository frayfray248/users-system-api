require('dotenv').config();
const express = require('express');
const http = require('http');

// routes
const usersRoute = require('./api/routes/users');

// port
const port = process.env.PORT;

// app object instances
const app = express();
const server = http.createServer(app);

// users route
app.use('/users', usersRoute);

// unimplemented routes message
app.use((req, res, next) => {
    res.send({ message: 'not found'}).status(404);
});

// start server
server.listen(port, () => console.log(`Listening on ${port}`));