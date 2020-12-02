require('dotenv').config();
const express = require('express');
const http = require('http');

// port
const port = process.env.PORT;

// app object instances
const app = express();
const server = http.createServer(app);

// http root
app.use("/", (req, res) => {
    res.send({ response: "I am alive"}).status(200);
});

// start server
server.listen(port, () => console.log(`Listening on ${port}`));