const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {DB_URI} =require('./src/utils/mongo_db')
const alarmRoutes =require('./src/routes/alarms')
const locationRoutes =require('./src/routes/location')

const app = express();

app.use(bodyParser.json()); 


app.use('/alarms',alarmRoutes)
app.use('/location',locationRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

mongoose
  .connect(DB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
