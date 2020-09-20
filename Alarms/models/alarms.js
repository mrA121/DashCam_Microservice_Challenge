const mongoose =require('mongoose')
const Schema= mongoose.Schema;

const alarmSchema = new Schema({
    imei:{
        type: Number,
        required:true
    },
    alarm_type:{
        type: String,
        required: true
    },
    alarm_time:{
        type: Date
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    },
    file_list:[String]
}
);



module.exports= mongoose.model('Alarm',alarmSchema)