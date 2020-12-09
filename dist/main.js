const virtFitApp = new VirtFitAPP
const renderer = new Renderer

if (isLoggedIn()) {
    renderer.renderSignIn()

    $('#sign-in-sign-up').on('click', '#go-to-sign-up', function () {
        renderer.renderSignUp()
    })
    $('#sign-in-sign-up').on('click', '#go-to-sign-in', function () {
        renderer.renderSignIn()
    })
    $('#sign-in-sign-up').on('click', '#sign-in',async function () {
        const emailPass = {
            email : $('#email').val(),
            password : $('#password').val()
        }
        const signInFunction = getSignInFunction()

        console.log(signInFunction)

        const user = await signInFunction(emailPass)
        if(user.error)
            $('#err').empty().text(user.error)
        else{
            const path = getPath()

            localStorage.id = user._id
            location.assign(path)
        }
    })

    $('#sign-in-sign-up').on('click', '#sign-up',async function () {
        const user = extractSignUpInputs()
        const missingInput = missingInputCheck(user)

        if(missingInput)
            $('#err').empty().text(`${missingInput} is missing`)
        else{
            const signUpFunction = getSignUpFunction()()
            const path = getPath()

            const newUser = await signUpFunction(user)
            localStorage.id = newUser._id
            location.assign(path)
        }
    })
    
}
//createNewTrainer


function isLoggedIn() {
    const id = localStorage.id
    if (id) {
        location.assign(`./user/user.html`)
        return false
    }
    return true
}

function extractSignUpInputs(){
    return {
        firstName : $('#firstName').val(),
        lastName : $('#lastName').val(),
        email : $('#email').val(),
        phoneNumber : $('#phoneNumber').val(),
        gender : $('#gender').val(),
        birthdate :new Date($('#birthDate').val()) ,
        height : $('#height').val(),
        weight : $('#weight').val(),
        password : $('#password').val()
    }
}
function missingInputCheck(user){
    return Object.keys(user).find(key => user[key] === "" || user[key] == "Invalid Date")
}


function isTrainee() { return $('#type-of-user').val() === "trainee"}

function getPath(){
    return isTrainee() ? "./user/user.html" : "./trainer/trainer.html"
}
function getSignUpFunction(){
    return isTrainee() ? virtFitApp.creatNewUser : virtFitApp.createNewTrainer
}
function getSignInFunction(){
    return isTrainee() ? virtFitApp.signInUser : virtFitApp.signInTrainer
}