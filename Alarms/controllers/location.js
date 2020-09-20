const Location = require("../models/location")

exports.postlocation= (req,res,next)=>{

    const imei= req.imei;
    const type = req.body.type;
    const location_time = req.body.location_time;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    if (type!=='LOCATION'){
        const error = new Error('Not a Valid Location Request.');
        error.statusCode=422;
        throw error;
    }

    const location= new Location({
        imei:imei,
        location_time:location_time,
        latitude:latitude,
        longitude:longitude
    });

    location
        .save()
        .then(result=>{
            res.status(201).json({
              message: 'Location saved successfully!',
              location: location,
            })
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}

exports.getlocation =(req,res,next)=>{
    let imei= req.imei
    Location.find({imei:imei})
        .then(locations => {
        res.status(200).json({
          message: 'Fetched locations successfully.',
          locations: locations,
          count:locations.length
        });
      })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}