const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatusSchema = new Schema({
    weight:	Number,
    bmrValue: Number,	
    status:	String,
    risk:	String,
    idealWeight: String,
    timeStamp:	Date,
    trainingCalories: Number
})

const Status = mongoose.model('status',StatusSchema)



module.exports = {Status, StatusSchema}