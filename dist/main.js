const virtFitApp = new VirtFitAPP
const renderer = new Renderer

init()

if (isLoggedIn()) {

  

    renderByType($('#type-of-user').val())

    $('#type-of-user').change(function () {
        const type = $(this).val()
        localStorage.type = type
        renderByType(type)
    })


    //User stufff
    $('#sign-in-sign-up').on('click', '#go-to-sign-up', function () {
        renderer.renderSignUp()
    })
    $('#sign-in-sign-up').on('click', '#go-to-sign-in', function () {
        renderer.renderSignIn()
    })
    $('#sign-in-sign-up').on('click', '#sign-in', async function () {
        const emailPass = {
            email: $('#email').val(),
            password: $('#password').val()
        }
        const user = await virtFitApp.signInUser(emailPass)
        if (user.error)
            $('#err').empty().text(user.error)
        else {
            localStorage.id = user._id
            location.assign(`./user/user.html`)
        }
    })

    $('#sign-in-sign-up').on('click', '#sign-up', async function () {
        const user = extractSignUpInputs()
        const missingInput = missingInputCheck(user)

        if (missingInput)
            $('#err').empty().text(`${missingInput} is missing`)
        else {
            const newUser = await virtFitApp.creatNewUser(user)
            localStorage.id = newUser._id
            location.assign(`./user/user.html`)
        }
    })

    //trainer stuff

    $('#sign-in-sign-up').on('click', '#go-to-trainer-sign-up', function () {
        renderer.renderTrainerSignUp()
    })
    $('#sign-in-sign-up').on('click', '#go-to-trainer-sign-in', function () {
        renderer.renderTrainerSignIn()
    })
    $('#sign-in-sign-up').on('click', '#trainer-sign-in', async function () {
        email = $('#email').val()
        password = $('#password').val()
        const trainer = await virtFitApp.signInTrainer(email, password)
        console.log(trainer)
        if (trainer.error)
            $('#err').empty().text(trainer.error)
        else {
            localStorage.id = trainer._id
            location.assign(`./trainer/trainer.html`)
        }
    })

    $('#sign-in-sign-up').on('click', '#trainer-sign-up', async function () {
        const trainer = extractTrainerSignUpInputs()
        const missingInput = missingInputCheck(trainer)
        if (missingInput)
            $('#err').empty().text(`${missingInput} is missing`)
        else {
            const newTrainer = await virtFitApp.createNewTrainer(trainer)
            if (newTrainer.error)
                $('#err').empty().text(newTrainer.error)
            else {
                localStorage.id = newTrainer._id
                location.assign(`./trainer/trainer.html`)
            }
        }
    })

}


function isLoggedIn() {
    const id = localStorage.id
    if (id) {
        assignPathByType()
        return false
    }
    return true
}

function extractSignUpInputs() {
    return {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        phoneNumber: $('#phoneNumber').val(),
        gender: $('#gender').val(),
        birthdate: new Date($('#birthDate').val()),
        height: $('#height').val(),
        weight: $('#weight').val(),
        password: $('#password').val()
    }
}
function extractTrainerSignUpInputs() {
    return {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        bio: $('#bio').val(),
        videoUrl: $('#videoUrl').val(),
        phoneNumber: $('#phoneNumber').val(),
        gender: $('#gender').val(),
        birthdate: new Date($('#birthDate').val()),
        password: $('#password').val()
    }
}

function missingInputCheck(user) {
    return Object.keys(user).find(key => (key !== "bio" && key !== "videoUrl") && user[key] === "" || user[key] == "Invalid Date")
}

function renderByType(type) {
    if (type === "trainee")
        renderer.renderSignIn()
    else
        renderer.renderTrainerSignIn()
}

function assignPathByType() {
    if (localStorage.type === "trainer")
        location.assign(`./trainer/trainer.html`)
    else
        location.assign(`./user/user.html`)
}

function init() {
    const type = localStorage.type
    if (type === "trainer")
        $('#type-of-user').val("trainer")
    else
        $('#type-of-user').val("trainee")
}