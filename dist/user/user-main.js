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
$('#recipes').on('click', '.nutrition', async function(){
    const recipeId = $(this).closest('.recipe').attr('id')
    const nutrient = await virtFitApp.getRecipeNutrition(recipeId)
    renderer.renderNutrition(nutrient)
})
// console.log(nutrient){
// glutenFree: false
// healthScore: 100
// id: 482788
// likes: 3213
// name: "Garlicky Pasta with Swiss Chard and Beans"
// nutrition: Array(30)
// 0: {title: "Calories", amount: 518.72, unit: "kcal", percentOfDailyNeeds: 25.94}
// 1: {title: "Fat", amount: 12.85, unit: "g", percentOfDailyNeeds: 19.78}
// 2: {title: "Saturated Fat", amount: 5.71, unit: "g", percentOfDailyNeeds: 35.67}
// 3: {title: "Carbohydrates", amount: 77.27, unit: "g", percentOfDailyNeeds: 25.76}
// 4: {title: "Net Carbohydrates", amount: 68.8, unit: "g", percentOfDailyNeeds: 25.02}
// 5: {title: "Sugar", amount: 6.09, unit: "g", percentOfDailyNeeds: 6.77}
// 6: {title: "Cholesterol", amount: 20.4, unit: "mg", percentOfDailyNeeds: 6.8}
// 7: {title: "Sodium", amount: 804.73, unit: "mg", percentOfDailyNeeds: 34.99}
// 8: {title: "Protein", amount: 30.02, unit: "g", percentOfDailyNeeds: 60.05}
// 9: {title: "Vitamin K", amount: 642.42, unit: "µg", percentOfDailyNeeds: 611.83}
// 10: {title: "Manganese", amount: 2.81, unit: "mg", percentOfDailyNeeds: 140.35}
// 11: {title: "Vitamin A", amount: 5229.63, unit: "IU", percentOfDailyNeeds: 104.59}
// 12: {title: "Selenium", amount: 51.42, unit: "µg", percentOfDailyNeeds: 73.46}
// 13: {title: "Magnesium", amount: 232.54, unit: "mg", percentOfDailyNeeds: 58.13}
// 14: {title: "Calcium", amount: 537, unit: "mg", percentOfDailyNeeds: 53.7}
// 15: {title: "Phosphorus", amount: 523.91, unit: "mg", percentOfDailyNeeds: 52.39}
// 16: {title: "Iron", amount: 8.37, unit: "mg", percentOfDailyNeeds: 46.48}
// 17: {title: "Copper", amount: 0.86, unit: "mg", percentOfDailyNeeds: 42.86}
// 18: {title: "Vitamin C", amount: 33.11, unit: "mg", percentOfDailyNeeds: 40.13}
// 19: {title: "Potassium", amount: 1244.72, unit: "mg", percentOfDailyNeeds: 35.56}
// 20: {title: "Fiber", amount: 8.47, unit: "g", percentOfDailyNeeds: 33.89}
// 21: {title: "Vitamin B1", amount: 0.5, unit: "mg", percentOfDailyNeeds: 33.63}
// 22: {title: "Folate", amount: 129.32, unit: "µg", percentOfDailyNeeds: 32.33}
// 23: {title: "Vitamin E", amount: 4.27, unit: "mg", percentOfDailyNeeds: 28.45}
// 24: {title: "Zinc", amount: 3.96, unit: "mg", percentOfDailyNeeds: 26.41}
// 25: {title: "Vitamin B6", amount: 0.49, unit: "mg", percentOfDailyNeeds: 24.7}
// 26: {title: "Vitamin B3", amount: 4.77, unit: "mg", percentOfDailyNeeds: 23.83}
// 27: {title: "Vitamin B2", amount: 0.35, unit: "mg", percentOfDailyNeeds: 20.49}
// 28: {title: "Vitamin B5", amount: 1.33, unit: "mg", percentOfDailyNeeds: 13.3}
// 29: {title: "Vitamin B12", amount: 0.36, unit: "µg", percentOfDailyNeeds: 6}
// length: 30
// __proto__: Array(0)
// vegan: false
// vegetarian: false
// __proto__: Object
//}





async function init(){
    id = localStorage.id
    user = await virtFitApp.getUserFromDB(id)
    console.log(user)


    renderer.renderStatus(formatStatusForRender(user))
}
