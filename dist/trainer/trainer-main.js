const renderer = new Renderer
const trainerLogic = new TrainerLogic()

let id

const formatStatusForRender = (user) => { return {firstName: user.firstName, status: user.status[user.status.length-1]} }

init()

$('#logout').on('click',function(){
    localStorage.removeItem("id")
    location.assign(`../index.html`)
})

///////////////////////////
async function init(){
    id = localStorage.id
    const trainer = await trainerLogic.getTrainerUsers(id)
    renderer.renderTainees(trainer)
}
/////////////////////


$('#rightSide-container').on('click', '.makePlane',async function(){
    const userId = $(this).closest('.user').attr('id')
    const userPlan = trainerLogic.makePlane(userId) // return object 
    // trainerRenderer.makeTable(userPlan) /// should template ('#table-template')
})

$('#search-meal').on('click',function(){
    // trainerRenderer.renderMealOptions()
})
$('#options').on('click','.option',async function(){
    $('#options').empty()
    const recipeTime = $(this).attr('id')
    const recipesArr = await trainerLogic.getRecipes(recipeTime)
    // trainerRenderer.renderRecipes(recipesArr) /// should display recipes on the leftSide bar
})

$('#leftSide-container').on('click', '#see-nutrition', async function(){
    const recipeId = $(this).closest('.recipe').data('id')
    const recipe = trainerLogic.getSearchedRecipe(recipeId)
    const nutrient = await trainerLogic.getRecipeNutrition(recipeId)
    // trainerRenderer.renderNutrition(recipe, nutrient) // in the render empty("#recipes") and display recipe and it's nutrition in this template, add a button with a class "addToPlan" for adding the recipe to the plan table 
})

$('#leftSide-container').on('click', '.add', async function(){
    
    // trainerRenderer.renderNutrition(recipe, nutrient) // in the render empty("#recipes") and display recipe and it's nutrition 
})






