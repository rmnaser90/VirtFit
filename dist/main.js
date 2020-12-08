// const virtFitApp = new VirtFitApp
const renderer = new Renderer

if (isLoggedIn()) {
    renderer.renderSignIn()

    $('#sign-in-sign-up').on('click', '#go-to-sign-up', function () {
        renderer.renderSignUp()
    })
    $('#sign-in-sign-up').on('click', '#go-to-sign-in', function () {
        renderer.renderSignIn()
    })
    $('#sign-in-sign-up').on('click', '#sign-in', function () {
        console.log("TBD sign in")
        const email = $('#email').val()
        const password = $('#password').val()
    })
    $('#sign-in-sign-up').on('click', '#sign-up', function () {
        console.log("TBD submit sign up")
        const firstName = $('#firstName').val()
        const lastName = $('#lastName').val()
        const email = $('#email').val()
        const phoneNumber = $('#phoneNumber').val()
        const gender = $('#gender').val()
        const birthDate = $('#birthDate').val()
        const height = $('#height').val()
        const weight = $('#weight').val()
        const password = $('#password').val()
        VirtFitAPP.signUp()
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