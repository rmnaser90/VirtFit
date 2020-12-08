const renderer = new Renderer
const virtFitApp = new VirtFitAPP()

let id
let user

const formatStatusForRender = (user) => { return {firstName: user.firstName, status: user.status[user.status.length-1]} }


init()



$('#logout').on('click',function(){
    localStorage.removeItem("id")
    location.assign(`../index.html`)
})

$('#search-meal').on('click',function(){
    renderer.renderMealOptions()
})
$('#options').on('click','.option',function(){
    $('#options').empty()
})

async function init(){
    id = localStorage.id
    user = await virtFitApp.getUserFromDB(id)
    console.log(user)


    renderer.renderStatus(formatStatusForRender(user))
}
