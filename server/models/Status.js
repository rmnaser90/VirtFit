const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatusSchema = new Schema({
    weight:	Number,
    bmrValue: Number,	
    status:	String,
    risk:	String,
    idealWeight: Number,
    timeStamp:	Date,
    trainingClories: Number
})

const Status = mongoose.model('status',StatusSchema)



module.exports = Status