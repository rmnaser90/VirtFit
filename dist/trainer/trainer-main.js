const renderer = new Renderer
const trainerLogic = new TrainerLogic()

let id

const formatStatusForRender = (user) => { return { firstName: user.firstName, status: user.status[user.status.length - 1] } }

init()

async function init() {
    loadGif()
    id = localStorage.id
    const trainer = await trainerLogic.getTrainerUsers(id)
    renderer.renderTainees(trainer)
    removeLoadGif()
}

$('#logout').on('click', function () {
    localStorage.removeItem("id")
    location.assign(`../index.html`)
})

$('#trainees-container').on('click', '.traineeBox', async function () {
    const userID = $(this).data('id')
    const user = await trainerLogic.getUserByID(userID)
    renderer.renderUserStatus(user)
    renderer.renderTable(trainerLogic.weekPlan)
})

$('.mealButtons').on('click', async function () {
    loadGif()
    const meal = $(this).attr('id')
    const recipies = await trainerLogic.getRecipes(meal)
    renderer.renderRecipies(recipies)
    removeLoadGif()
})

$('#resultMealsContainer').on('click', '.addRecipe', function () {
    const recipeId = $(this).closest('.recipe').data('id')
    const day = $(this).closest('.recipe').find('.daySelect').val()
    const meal = $(this).closest('.recipe').find('.mealSelect').val()
    trainerLogic.addMeal(recipeId, day, meal)
})

$('#userInfo').on('click', '#addWeekPlan', async function () {
    loadGif()
    const userID = trainerLogic.currentTrainee
    const response = await trainerLogic.addPlan(userID)
    renderer.renderTable(trainerLogic.weekPlan)
    removeLoadGif()
})







$('#rightSide-container').on('click', '.makePlane', async function () {
    const userId = $(this).closest('.user').attr('id')
    const userPlan = trainerLogic.makePlane(userId) // return object 
    // trainerRenderer.makeTable(userPlan) /// should template ('#table-template')
})

$('#options').on('click', '.option', async function () {
    loadGif()
    $('#options').empty()
    const recipeTime = $(this).attr('id')
    const recipesArr = await trainerLogic.getRecipes(recipeTime)
    // trainerRenderer.renderRecipes(recipesArr) /// should display recipes on the leftSide bar
    removeLoadGif()
})
$('#lunch').on('click', async function () {
    loadGif()
    const params = extractRecipesOptions()
    const recipesArr = await trainerLogic.getRecipes(params)
    renderer.renderRecipies(recipesArr)
    removeLoadGif()
})

function extractRecipesOptions() {

    return {
        cuisine: $('#cuisine').val(),
        diet: $('#diet').val(),
        intolerances: $('#intolerances').val(),
        number: 10,
        type: $('#type').val()
    }
}



$('#leftSide-container').on('click', '#see-nutrition', async function () {
    loadGif()
    const recipeId = $(this).closest('.recipe').data('id')
    const recipe = trainerLogic.getSearchedRecipe(recipeId)
    const nutrient = await trainerLogic.getRecipeNutrition(recipeId)
    // trainerRenderer.renderNutrition(recipe, nutrient) // in the render empty("#recipes") and display recipe and it's nutrition in this template, add a button with a class "addToPlan" for adding the recipe to the plan table 
    removeLoadGif()
})

$('#resultMealsContainer').on('click', '.see-nutrition', async function () {
    loadGif()
    const recipeId = $(this).closest('.recipe').data('id')
    const nutrient = await trainerLogic.getRecipeNutrition(recipeId)

    const recipeContainer = $(this).closest('.recipes-container')
    renderer.hideElement(recipeContainer)

    const nutritionContainer = $(this).closest('.recipe').find('.nutrition-container')

    renderer.renderNutrition(nutritionContainer, nutrient)
    removeLoadGif()
})
$('#resultMealsContainer').on('click', '.nutrition-container', async function () {
    const recipeContainer = $(this).closest('.recipe').find('.recipes-container')
    renderer.showElement(recipeContainer)

    const nutritionContainer = $(this).closest('.nutrition-container')

    nutritionContainer.empty()
})





function loadGif() {
    $('body').append('<img src="https://i.gifer.com/Vp3R.gif" class="loading-gif" >')
}
function removeLoadGif() {
    $('.loading-gif').remove()
}

