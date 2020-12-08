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
}



function isLoggedIn() {
    const id = localStorage.id
    if (id) {
        location.assign(`./user/user.html`)
        return false
    }
    return true
}