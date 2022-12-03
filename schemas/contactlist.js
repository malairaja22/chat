const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const contactsschema = new Schema({
    username:{
        type:String,
        required:true
    },
    contacts:{
        type:Array,
        required:false
    }
})

module.exports = mongoose.model("Contacts",contactsschema)