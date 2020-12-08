class Renderer {
    constructor() {
        const statusSource = $('#status-template').html();
        this.statusTemplate = Handlebars.compile(statusSource); 
        
        const mealOptionsSource = $('#meal-options-template').html();
        this.mealOptionsTemplate = Handlebars.compile(mealOptionsSource); 
        
        Handlebars.registerHelper('formatDate', dateString => moment(dateString).format('MMMM Do YYYY, h:mm:ss a'))
    }

    _handleBarAppender = (elementToAppendTo,Template,data) => {
        let newHTML = Template(data);
        elementToAppendTo.empty().append(newHTML);
    }

    renderStatus = data => this._handleBarAppender($('#content-container'),this.statusTemplate,data)
    renderMealOptions = data => this._handleBarAppender($('#options'),this.mealOptionsTemplate,{})

}