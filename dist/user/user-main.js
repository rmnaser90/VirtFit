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
$('#options').on('click','.option',async function(){
    $('#options').empty()
    const recipeTime = $(this).attr('id')
    const recipesArr = await virtFitApp.getRecipes(recipeTime)
})
$('#options').on('click','.option',async function(){
    $('#options').empty()
    const recipeTime = $(this).attr('id')
    const recipesArr = await virtFitApp.getRecipes(recipeTime)
    renderer.renderRecipes(recipesArr)
})
// getRecipeNutrition()
$('#recipes').on('click', '.recipes-container', async function(){
    const recipeContainer = $(this).closest('.recipe')
    const nutritionContainer = recipeContainer.find('.nutrition-container')
    const recipeId = recipeContainer.data('id')

    const nutrient = await virtFitApp.getRecipeNutrition(recipeId)
    renderer.renderNutrition(nutritionContainer,nutrient)
    renderer.hideElement($(this))
})
$('#recipes').on('click', '.nutrition-container', function(){
    $(this).empty()
    const recipeContainer = $(this).closest('.recipe').find('.recipes-container')
    renderer.showElement(recipeContainer)
})

$('#update').on('click', async function(){
    const newWeight = $(this).closest('#weight-elements-container').find('#weight').val()
    if(newWeight !== ""){
        $(this).closest('#weight-elements-container').find('#weight').val("")
        console.log(newWeight)
        const user = await virtFitApp.updateUserStatus(localStorage.id, newWeight)
        let updatedUser = formatStatusForRender(user)
        updatedUser.status.isUpdated = true
        renderer.renderStatus(updatedUser)
    }
})

$('#find-trainer').on('click', async function(){
    const trainersArr = 
    renderer.renderTrainers(trainersArr)
})






async function init(){
    id = localStorage.id
    user = await virtFitApp.getUserFromDB(id)
    console.log(user)


    renderer.renderStatus(formatStatusForRender(user))
}
