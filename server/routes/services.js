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

    async getRecipe(recipeTime){
        this.recipes.url =`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?type=${recipeTime}`
        const recipesArr = await  this.axios.request(this.recipes)
        return recipesArr.data.results
        // returns array of 10 recipes :
        // {
        //     id: 667917,
        //     title: 'Cilantro Salsa',
        //     readyInMinutes: 20,
        //     servings: 2,
        //     sourceUrl: 'http://www.thegraciouspantry.com/clean-eating-cilantro-salsa/',
        //     openLicense: 0,
        //     image: 'Cilantro-Salsa-667917.jpg'
        //   },
    }

    async getRecipeNutrition(recipeId){
        this.nutrition.url= `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`   
        const nutritionData = await this.axios.request(this.nutrition)
        const relevantNutrition={
            id: nutritionData.data.id,
            name: nutritionData.data.title,   
            vegetarian: nutritionData.data.vegetarian, //boolean
            vegan: nutritionData.data.vegan,//boolean
            glutenFree: nutritionData.data.glutenFree, //boolean
            healthScore: nutritionData.data.healthScore, //number
            likes: nutritionData.data.aggregateLikes,//number
            nutrition: nutritionData.data.nutrition.nutrients//array //{ title: 'Vitamin A',amount: 90.6,unit: 'IU',percentOfDailyNeeds: 1.81}    
        }
        return relevantNutrition
    }


}



module.exports = HealthApi








