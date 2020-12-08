const express = require('express')
const HealthApi = require('./services')
const healthApi = new HealthApi
const router = express.Router()
const moment = require('moment')
const User = require('../models/User')
const Status = require('../models/Status')


router.post('/user', async function (req, res) {
    const user = req.body
    user = new User(user)
    await user.save()
    res.send(user)
})

router.post('/signIn', async function (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        if (user.password == password) {
            res.send(user)
        } else {
            res.send({ error: "wrong password" })
        }
    } else {
        res.send({ error: "email doesn't exist" })
    }
})

router.get('user/:userID', async function (req, res) {
    const { userID } = req.params
    const user = await User.findById(userID)
    return user
})

// router.put('/user/:userId/:weight', async function (req, res) {
//     const { userID, weight } = req.params
//     const user = await User.findById(userID)
//     const age = Date.now() - user.birthdate
//     const status = await healthApi.getUserStatus(weight, user.height, user.sex, age)
//     status = new Status(status)
// })





module.exports = router