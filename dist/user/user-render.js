class Renderer {
    constructor() {
        const statusSource = $('#status-template').html();
        this.statusTemplate = Handlebars.compile(statusSource); 
        
        const mealOptionsSource = $('#meal-options-template').html();
        this.mealOptionsTemplate = Handlebars.compile(mealOptionsSource); 
        
        const recipesSource = $('#recipes-template').html();
        this.recipesTemplate = Handlebars.compile(recipesSource); 
        
        const nutritionSource = $('#nutrition-template').html();
        this.nutritionTemplate = Handlebars.compile(nutritionSource); 
        
        const trainerSource = $('#trainer-template').html();
        this.trainerTemplate = Handlebars.compile(trainerSource); 

        Handlebars.registerHelper('formatDate', dateString => moment(dateString).format('MMMM Do YYYY, h:mm:ss a'))

        Handlebars.registerHelper('genderCheck', gender => gender === "m" ? "Male" : "Female")
    }

    _handleBarAppender = (elementToAppendTo,Template,data) => {
        let newHTML = Template(data);
        elementToAppendTo.empty().append(newHTML);
    }

    showElement = element => element.css("visibility", "visible")
    hideElement = element => element.css("visibility", "hidden")

    renderStatus = data => this._handleBarAppender($('#content-container'),this.statusTemplate,data)
    renderMealOptions = data => this._handleBarAppender($('#options'),this.mealOptionsTemplate,{})

    renderRecipes = recipesArr => this._handleBarAppender($('#recipes-trainers'), this.recipesTemplate, {recipe: recipesArr})
    renderNutrition = (nutritionContainer,nutrition) => this._handleBarAppender(nutritionContainer,this.nutritionTemplate,nutrition)
    
    renderTrainers = (trainers) => this._handleBarAppender($('#recipes-trainers'),this.trainerTemplate,trainers)

}