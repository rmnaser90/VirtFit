const apiManager = new ApiManager
class TrainerLogic {

    constructor() {
        this.trainer = {}
        this.currentTrainee
        this.weekPlan = {}
        this.recipes = []
        this.recipeNutrition = []
    }

    async getTrainerUsers(trainerId) {
        const trainer = await apiManager.getTrainerUser(trainerId)
        this.trainer = trainer
        return this.trainer
    }


    addMeal(recipeId, day, meal) {
        const recipe = this.recipes.find(r => r.id === recipeId)
        this.weekPlan[day] = this.weekPlan[day] || {}
        this.weekPlan[day][meal] = recipe
        return this.weekPlan
    }

    getUserByID(userID) {
        const user = this.trainer.trainees.find(t => t._id === userID)
        this.currentTrainee = userID
        this.weekPlan = user.weeklyPlan || {}
        return user
    }

    async addPlan(userID) {
        const response = await apiManager.addWorkPlan(userID, this.weekPlan)
        return response
    }

    async getRecipes(recipeTime) {
        const recipesArr = await apiManager.getRecipes(recipeTime)
        this.recipes = recipesArr
        return this.recipes
    }

    async getRecipeNutrition(recipeId) {
        const nutrients = await apiManager.getRecipeNutrition(recipeId)
        this.recipeNutrition = nutrients
        return this.recipeNutrition
    }

    //add here function which only retrieve the (this)recipes array 
    getSearchedRecipe = (recipeId) => this.recipes.find(r => r._id === recipeId)
























    // async creatNewUser(newUser){
    //    const user = await apiManager.creatNewUser(newUser)
    //    this.user = user
    //    return this.user
    // } 

    // async signInUser(emailPassword){
    //   const user = await apiManager.signInUser(emailPassword)
    //   this.user = user
    //   return this.user
    // } 


    // async updateUserStatus(userId, userWeight){
    //     const updatedUser = await apiManager.updateUserStatus(userId, userWeight)
    //     this.user = updatedUser
    //     return this.user
    // } 


}


