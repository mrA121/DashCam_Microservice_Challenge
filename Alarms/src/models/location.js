const mongoose =require('mongoose')
const Schema= mongoose.Schema;

const locationSchema = new Schema({
    imei:{
        type: Number,
        required:true
    },
    location_time:{
        type: Date
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    }
}
);
module.exports = mongoose.model('Location', locationSchema);
