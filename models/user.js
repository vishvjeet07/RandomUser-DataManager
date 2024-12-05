const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/cards");

const Users = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,    
        required:true
    }

});

module.exports = mongoose.model("user",Users);