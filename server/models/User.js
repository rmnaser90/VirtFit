const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
const Status = require('./Status')
const UserSchema = new Schema({
    firstName:	String,
    lastName:	String,
    email:	String,
    password:	String,
    phoneNo:	String,
    gender:	String,
    birthdate:	Date,
    height:	Number,
    weight: Number
    
})



const User = mongoose.model('user',UserSchema)

module.exports = User