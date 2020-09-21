const Alarm = require('../models/alarms');

exports.postalarm=(req,res,next)=>{
    const imei = req.imei;
    const type= req.body.type;
    const alarm_type = req.body.alarm_type;
    const alarm_time = req.body.alarm_time;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const file_list =req.body.file_list;

    if (type!=='ALARM'){
        const error = new Error('Not a Valid Alarm Request.');
        error.statusCode=422;
        throw error;
    }

    const alarm = new Alarm({
        imei:imei,
        alarm_type:alarm_type,
        alarm_time:alarm_time,
        latitude:latitude,
        longitude:longitude,
        file_list:file_list
    });

    alarm
        .save()
        .then(result=>{
            res.status(201).json({
              message: 'Alarm saved successfully!',
              alarm: alarm,
            })
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}

exports.getalarm=(req,res,next)=>{
    let imei= req.imei
    Alarm.find({imei:imei})
        .then(alarms => {
        res.status(200).json({
          message: 'Fetched alarms successfully.',
          alarms: alarms,
          count:alarms.length
        });
      })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}

exports.filteralarm=(req,res,next)=>{

    let imei=req.imei;
    let start_time=new Date(req.query.start_time || '1970-01-01');
    let end_time=new Date(req.query.end_time || '3000-01-01')
    let alarm_type=req.query.alarm_type 

    let query={
      imei:imei,
      alarm_time:{"$gte": start_time, "$lt": end_time}
    }
    if (alarm_type){
      query['alarm_type']=alarm_type
    }

    Alarm.find(query)
        .then(alarms => {
        res.status(200).json({
          message: 'Fetched alarms successfully.',
          alarms: alarms,
          count:alarms.length
        });
      })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
    
}