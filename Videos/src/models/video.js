const mongoose =require('mongoose')
const Schema= mongoose.Schema;

const videoSchema = new Schema({
    imei:{
        type: Number,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    }
});


module.exports= mongoose.model('Videos',videoSchema)
