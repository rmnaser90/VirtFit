const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
const StatusModule = require('./Status')
const StatusSchema = StatusModule.StatusSchema
const UserSchema = new Schema({
    firstName:	String,
    lastName:	String,
    email:	{type: String, unique:true},
    password:	String,
    phoneNo:	String,
    gender:	String,
    birthdate:	Date,
    height:	Number,
    weight: Number,
    status: [StatusSchema]
    
})



const User = mongoose.model('user',UserSchema)

module.exports = {User,UserSchema}