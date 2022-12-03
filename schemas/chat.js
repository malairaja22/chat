const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const chatschema = new Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Chat",chatschema)