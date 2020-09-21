const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const videoRoutes= require('./src/routes/video');
const {DB_URI}= require('./src/routes/mongo_db')

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/videos');
    },
    filename: (req, file, cb) => {
        req.filename=new Date().toISOString() + '-' + file.originalname
      cb(null, req.filename);
    }
  });
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(null, false);
    }  
};

app.use(bodyParser.json()); 

app.use(
    multer({storage:fileStorage,fileFilter:fileFilter}).single('video')
    )

app.use("/videos",videoRoutes)

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
    app.listen(3002);
  })
  .catch(err => console.log(err));
