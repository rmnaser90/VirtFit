const renderer = new Renderer()
const virtFitApp = new VirtFitAPP()

let id
let user

const fixer = function(myStr) {
    const upperCase = myStr.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
    return (upperCase)
}

const formatStatusForRender = (user) => {
    return {
        firstName: user.firstName,
        status: user.status[user.status.length - 1],
    }
}

init()

$('#logout').on('click', function () {
    localStorage.removeItem('id')
    location.assign(`../index.html`)
})

$('#search-meal').on('click', function () {
    const ifPopulated = $('#options').find('.option').length
    if (ifPopulated) {
        $('#options').empty()
    } else {
        renderer.renderMealOptions()
    }
})

$('#options').on('click', '#lunch', async function () {
    loadGif()
    const params = extractRecipesOptions()

    const recipesArr = await virtFitApp.getRecipes(params)
    renderer.renderRecipes(recipesArr)
    removeLoadGif()
})

function extractRecipesOptions() {
    return {
        cuisine: $('#cuisine').val(),
        diet: $('#diet').val(),
        intolerances: $('#intolerances').val(),
        number: 10,
        type: $('#type').val(),
    }
}

$('#recipes-trainers').on('click', '.recipes-container', async function () {
    loadGif()
    const recipeContainer = $(this).closest('.recipe')
    const nutritionContainer = recipeContainer.find('.nutrition-container')
    const recipeId = recipeContainer.data('id')

    const nutrient = await virtFitApp.getRecipeNutrition(recipeId)
    renderer.renderNutrition(nutritionContainer, nutrient)
    renderer.hideElement($(this))
    removeLoadGif()
})
$('#recipes-trainers').on('click', '.nutrition-container', function () {
    $(this).empty()
    const recipeContainer = $(this)
        .closest('.recipe')
        .find('.recipes-container')
    renderer.showElement(recipeContainer)
})

$('#update').on('click', async function () {
    loadGif()
    const newWeight = $(this)
        .closest('#weight-elements-container')
        .find('#weight')
        .val()
    if (newWeight !== '') {
        $(this).closest('#weight-elements-container').find('#weight').val('')

        const user = await virtFitApp.updateUserStatus(
            localStorage.id,
            newWeight
        )
        let updatedUser = formatStatusForRender(user)
        updatedUser.status.isUpdated = true
        renderer.renderStatus(updatedUser)
    }
    removeLoadGif()
})

$('#find-trainer').on('click', async function () {
    loadGif()
    const ifPopulated = $('#recipes-trainers').find('.trainer').length

    if (ifPopulated) {
        $('#recipes-trainers').empty()
    } else {
        const trainersArr = await virtFitApp.getTrainers()

        renderer.renderTrainers({ trainers: trainersArr })
    }
    removeLoadGif()
})

$('#plan').on('click', function () {
    loadGif()
    const ifPopulated = $('#recipes-trainers').find('#weeklyPlanTable').length

    if (ifPopulated) {
        $('#recipes-trainers').empty()
    } else {
        renderer.renderTable(user.weeklyPlan)
    }
    removeLoadGif()
})

$('#recipes-trainers').on('click', '.select-trainer', function () {
    const userId = user['_id']
    const trainerId = $(this).closest('.trainer').data('id')

    virtFitApp.assignTrainer(userId, trainerId)
    $('#recipes-trainers').empty()
    console.log(user)
})

function loadGif() {
    $('body').append(
        '<img src="https://i.gifer.com/Vp3R.gif" class="loading-gif" >'
    )
}
function removeLoadGif() {
    $('.loading-gif').remove()
}

async function init() {
    loadGif()
    id = localStorage.id
    user = await virtFitApp.getUserFromDB(id)
    $('#user-name').text(`${user.firstName} ${user.lastName}`)
    if (user.trainer){ 
        const trainer = await virtFitApp.getTrainerUser(user.trainer)
        console.log(trainer)
        $('#find-trainer').text(`Change ${fixer(trainer.firstName)} ${fixer(trainer.lastName)} with a new trainer`)

    }

    renderer.renderStatus(formatStatusForRender(user))
    removeLoadGif()
}
