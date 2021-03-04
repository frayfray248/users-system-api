// dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//imports
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('./cors');
const morgon = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('./db');

// routes
const usersRoute = require('./api/routes/users');

// port
const port = process.env.PORT;

// instances
const app = express();
const server = http.createServer(app);

// swagger documentation middleware
const OAS = YAML.load('./users-system-doc.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(OAS));

// logging
app.use(morgon('dev'));

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cors
app.use(cors);

// users route
app.use('/users', usersRoute);

// unimplemented routes message
app.use((req, res, next) => { res.send({ message: 'not found'}).status(404); });

// error response
app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status) || 500;
    res.json({ message : 'Internal Server Error' })
});

// start server
server.listen(port, () => console.log(`Listening on ${port}`));