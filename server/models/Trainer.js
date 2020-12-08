const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = require('./User').UserSchema

const TrainerSchema = new Schema({
    firstName:	String,
    lastName:	String,
    email:	{type: String, unique:true},
    password:	String,
    phoneNo:	String,
    gender:	String,
    birthdate:	Date,
    trainees: [UserSchema]
    
})

const Trainer = mongoose.model('trainer',TrainerSchema)


module.exports = {Trainer,TrainerSchema}