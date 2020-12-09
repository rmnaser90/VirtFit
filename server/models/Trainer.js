const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User').User
const TrainerSchema = new Schema({
    firstName:	String,
    lastName:	String,
    email:	{type: String, unique:true},
    bio: String,
    videoUrl:String,
    rating: Number,
    password:	String,
    phoneNo:	String,
    gender:	String,
    birthdate:	Date,
    trainees: [{type: Schema.Types.ObjectId, ref: 'user'}]
    
})

const Trainer = mongoose.model('trainer',TrainerSchema)


module.exports = Trainer