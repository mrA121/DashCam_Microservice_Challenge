const express = require('express');
const bodyParser = require('body-parser');

const commandRoutes=require('./routes/command')

const app = express();
app.use(bodyParser.json());

app.use('/api/command',commandRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

module.exports=app;