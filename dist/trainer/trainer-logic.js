// const apiManager = new ApiManager
class TrainerLogic{
 
    constructor(){
        this.trainer={}
        this.recipes=[]
        this.recipeNutrition=[]
        this.weekPlan={}
    }
    
    addMeal(recipeId, day, meal){
        const recipe = this.recipes.find(r => r.id === recipeId)
        this.weekPlan[day][meal] = recipe
        return this.weekPlan
    }

    makePlane(userId){
        const user = this.trainer.tranees.find(u._id === userId)
        
    }
    
    async getRecipes(recipeTime){
        const recipesArr = await apiManager.getRecipes(recipeTime)
        this.recipes = recipesArr
        return this.recipes
    }
    
    async getRecipeNutrition(recipeId){
        const nutrients = await apiManager.getRecipeNutrition(recipeId)
        this.recipeNutrition = nutrients
        return this.recipeNutrition
    }

    

    async creatNewUser(newUser){
       const user = await apiManager.creatNewUser(newUser)
       this.user = user
       return this.user
    } 
    
    async signInUser(emailPassword){
      const user = await apiManager.signInUser(emailPassword)
      this.user = user
      return this.user
    } 
    
    async getUserFromDB(userId){
        const userData = await apiManager.getUserFromDB(userId)
        this.user = userData
        return this.user
    }

    async updateUserStatus(userId, userWeight){
        const updatedUser = await apiManager.updateUserStatus(userId, userWeight)
        this.user = updatedUser
        return this.user
    } 

   
}


