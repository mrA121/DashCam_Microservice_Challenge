const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const alarmRoutes =require('./routes/alarms')
const locationRoutes =require('./routes/location')

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
  .connect(
      'mongodb+srv://alarm:1234qwer1@cluster0.xnumo.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
