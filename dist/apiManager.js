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
        const userData = await $.get(`/user/${userId}`)
        return (userData)
    }

    async updateUserStatus(userId, userWeight){
        console.log(userId, userWeight)
        //  = await $.put(`/user/${userId}/${userWeight}`) //`/user?userId=${userId}&weight=${userWeight}`
        const updatedUser = await $.ajax({url:`/user/${userId}/${userWeight}`,type: 'PUT'})
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
    
    async getTrainerUser(trainerID){
        const trainer = await $.get(`/trainer/${trainerID}`)
        return trainer
    }
    async assignTrainer(userID,trainerID){
        const response = await $.ajax({url: `/userTrainer/${userID}/${trainerID}`,type: 'PUT'})
        return response
    }

    async signInTrainer(email,password){
        const trainer = await $.post(`/trainerSignIn/`,{email,password})
        return trainer
    }

    async createNewTrainer(newTrainer){
        const savedTrainer = await $.post(`/trainer`,newTrainer)
        return savedTrainer
    }

    getTrainers = async () => await $.get('/trainers')

}



