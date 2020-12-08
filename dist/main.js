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
        const user = await virtFitApp.signInUser(emailPass)
        localStorage.id = user._id
        location.assign(`./user/user.html`)
    })

    $('#sign-in-sign-up').on('click', '#sign-up',async function () {
        const user = {
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
        const newUser = await virtFitApp.creatNewUser(user)
        
        localStorage.id = newUser._id
        location.assign(`./user/user.html`)
    })
    
}



function isLoggedIn() {
    const id = localStorage.id
    if (id) {
        location.assign(`./user/user.html`)
        return false
    }
    return true
}