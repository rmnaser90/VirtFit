class ApiManager{
    
    async creatNewUser(newUser){
        const savedUser = await $.post('/user', newUser)
        return (savedUser)
    } 
    
    async signInUser(emailPassword){
        const user = await $.post('/signIn', emailPassword)
        return (user)
    } 
    
    async getUserFromDB(userId){
        const userData = await $.get(`user/${userId}`)
        return (userData)
    }

    async updateUserStatus(userId, userWeight){
        const updatedUser = await $.put(`/user?userId=${userId}&weight=${userWeight}`)
        return (updatedUser)
    }
    
    async getRecipes(recipeTime){
        const recipesArr = await $.get(`/recipes/${recipeTime}`)
        return (recipesArr)
    }
    
    async getRecipeNutrition(recipeId){
        const nutrients = await $.get(`/nutrition/${recipeId}`)
        return (nutrients)
    }
    
}



