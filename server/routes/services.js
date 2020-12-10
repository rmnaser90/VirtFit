class HealthApi {
    constructor() {
        this.apiKey =process.env.API_KEY
        this.axios = require('axios')
        this.bmr ={
            method: 'POST',
            url: 'https://bmi.p.rapidapi.com/',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': 'bmi.p.rapidapi.com'
            },
            data : {
                weight: {value: '85.00', unit: 'kg'},
                height: {value: '170.00', unit: 'cm'},
                sex: 'm',
                age: '24'
            }
        }

        this.recipes={
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                useQueryString:true
            }
        }

        this.nutrition={
            method: 'GET',
            params:{includeNutrition: "true"},
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        }

    }

        
    async getUserStatus(weight, height, sex, age) {
            this.bmr.data.weight.value= weight
            this.bmr.data.height.value= height
            this.bmr.data.sex= sex
            this.bmr.data.age= age

            console.log(this.bmr);

        const response =  await this.axios.request(this.bmr)  
        const relevantData = {
            weight:response.data.weight.kg,
            status:response.data.bmi.status,
            risk:response.data.bmi.risk,
            idealWeight:response.data.ideal_weight,
            bmrValue:response.data.bmr.value,
            timeStamp: Date.now()
        }
        console.log(relevantData);
        return relevantData
    } 

    async getRecipe(params){
        this.recipes.params = params        
        // this.recipes.url =`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?type=${recipeTime}`
        this.recipes.url =`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`
        const recipesArr = await  this.axios.request(this.recipes)
        return recipesArr.data.results
    }

    async getRecipeNutrition(recipeId){
        this.nutrition.url= `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`   
        const nutritionData = await this.axios.request(this.nutrition)
        const relevantNutrition={
            id: nutritionData.data.id,
            name: nutritionData.data.title,   
            vegetarian: nutritionData.data.vegetarian,
            vegan: nutritionData.data.vegan,
            glutenFree: nutritionData.data.glutenFree, 
            healthScore: nutritionData.data.healthScore, 
            likes: nutritionData.data.aggregateLikes,
            nutrition: nutritionData.data.nutrition.nutrients   
        }
        return relevantNutrition
    }
}



module.exports = HealthApi








