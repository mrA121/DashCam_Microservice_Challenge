const zip= require('express-zip');
const fs = require('fs')

const Video=require('../models/video');

exports.postvideo=(req,res,next)=>{

    if (!req.filename){
        const error=new Error('Invalid File.');
        error.statusCode=422;
        throw error;
    }

    const videoUrl= req.file.path;
    const imei=req.body.imei
    const filename=req.filename
    
    const video= new Video({
        imei:imei,
        filename:filename,
        filepath:videoUrl
    })
    video
        .save()
        .then(result=>{
            res.status(201).json({
            message: 'Viedo saved successfully!',
            video: video,
            })
        })
        .catch(err => {
            if (!err.statusCode) {
            err.statusCode = 500;
            }
            next(err);
        });  
}

exports.getvideo=(req,res,next)=>{
    let imei=req.imei
    Video.find({imei:imei})
        .then(videos => {
            const files=[]
            for (let key in videos){
                let {filename,filepath}=videos[key]
                if (filepath){
                    console.log(filename,filepath)
                    files.push({path:filepath,name:filename})
                }
            }
            res.setHeader('Content-disposition', `attachment; filename=${imei}-clips.zip`);
            res.zip(files)
      })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}

