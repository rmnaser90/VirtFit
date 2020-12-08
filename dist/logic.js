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

}


