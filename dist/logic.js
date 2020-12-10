const apiManager = new ApiManager
class VirtFitAPP{
 
    constructor(){
        this.user={}
        this.recipes=[]
        this.recipeNutrition=[]
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

    async getRecipes(params){
        const recipesArr = await apiManager.getRecipes(params)
        this.recipes = recipesArr
        return this.recipes
    }
    
    async getRecipeNutrition(recipeId){
        const nutrients = await apiManager.getRecipeNutrition(recipeId)
        this.recipeNutrition = nutrients
        return this.recipeNutrition
    }
   
    async signInTrainer(email,password){
        const trainer = await apiManager.signInTrainer(email,password)
        return trainer
    }

    createNewTrainer = async newTrainer => await apiManager.createNewTrainer(newTrainer)

    getTrainers = async () => await apiManager.getTrainers()

    async assignTrainer(userID,trainerID){
        const response = await apiManager.assignTrainer(userID,trainerID)
        return response
    }
}


