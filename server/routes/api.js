const express = require('express')
const HealthApi = require('./services')
const healthApi = new HealthApi
const router = express.Router()
const moment = require('moment')
const User = require('../models/User').User
const Status = require('../models/Status').Status
const Trainer = require('../models/Trainer')


router.post('/user', async function (req, res) {
    const userReq = req.body
    const user = new User(userReq)
    console.log(user)
    const age = new Date().getFullYear() - user.birthdate.getFullYear()
    const result = await healthApi.getUserStatus(user.weight, user.height, user.gender, age)
    const status = new Status(result)
    user.status.push(status)
    user.save().then(function (result) {
        res.send(user)
    }).catch(function (err) {
        res.send({ error: "used email" })
    })

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

router.get('/user/:userID', async function (req, res) {
    const { userID } = req.params
    const user = await User.findById(userID)
    res.send(user)
})

router.put('/user/:userId/:weight', async function (req, res) {
    const { userId, weight } = req.params
    const user = await User.findById(userId)
    const age = new Date().getFullYear() - user.birthdate.getFullYear()
    const result = await healthApi.getUserStatus(weight, user.height, user.gender, age)
    const status = new Status(result)
    status.trainingCalories = 400
    console.log(status);
    user.status.push(status)
    await user.save()
    res.send(user)
})

// trainers routes
router.post('/trainer', async function (req, res) {
    const userReq = req.body
    const trainer = new Trainer(userReq)
    trainer.save().then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({ error: "used email" })
    })
})

router.put('/userTrainer/:userID/:trainerID', async function (req, res) {
    const { userID, trainerID } = req.params
    const user = await User.findById(userID)
    const trainer = await Trainer.findById(trainerID)
    console.log(user)
    console.log(trainer)
    user.trainer = trainer
    trainer.trainees.push(user)
    await user.save()
    await trainer.save()
    res.send({ user, trainer })
})

router.get('/trainer/:trainerID', async function (req, res) {
    const { trainerID } = req.params
    const trainer = await Trainer.findById(trainerID).populate("trainees").exec()
    trainer.trainees.forEach(t => t.password = '')
    res.send(trainer)
})

router.post('/weekPlan/:userID', async function (req, res) {
    const { userID } = req.params
    const weeklyPlan = req.body
    const user = await User.findById(userID)
    user.weeklyPlan = weeklyPlan
    user.save()
    res.send(user)
})


//Todo: create nutrition routes - farees


router.get('/recipes/:recipeTime', async function (req, res) {
    const { recipeTime } = req.params
    const recipesArr = await healthApi.getRecipe(recipeTime)
    res.send(recipesArr)
})

router.get('/nutrition/:recipeId', async function (req, res) {
    const { recipeId } = req.params
    const nutrients = await healthApi.getRecipeNutrition(recipeId)
    res.send(nutrients)
})




// end of fares job

module.exports = router