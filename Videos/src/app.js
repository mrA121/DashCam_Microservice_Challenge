const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');


const videoRoutes= require('./routes/video');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'/videos'));
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

app.use("api/video",videoRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

module.exports=app;