
const renderer = new Renderer

$('#logout').on('click',function(){
    localStorage.removeItem("id")
    location.assign(`../index.html`)
})

