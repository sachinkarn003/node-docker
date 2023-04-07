const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user Must have a username'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'user Must have a password']
    }
});

module.exports = mongoose.model('users',userSchema);