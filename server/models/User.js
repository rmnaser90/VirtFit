const mongoose = require('mongoose')
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

const newUser =  new User({
    firstName:	"rami",
    lastName:	"rami",
    email:	'rami@rami.com',
    password:	'asdasd',
    phoneNo:	"05232323",
    gender:	'm',
    birthdate:	Date.now(),
    height:	170,
    weight:72
})

console.log(newUser);
newUser.save()

module.exports = User