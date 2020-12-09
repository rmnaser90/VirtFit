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
///////////////////////////
async function init(){
    id = localStorage.id
    trainer = await trainerLogic.getTrainerFromDB(id)
    
    renderer.renderTrainer(trainer)
}


$('#search-meal').on('click', '.makePlane',async function(){
    const userId = $(this).closest('.user').attr('id')
    userId.weeklyPlan
    tableObj =  trainerLogic.getTable(id)
    renderer.makeTable(tableObj)
})
