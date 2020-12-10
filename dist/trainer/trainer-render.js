class Renderer {
    constructor() {
       
        this.traineeSource = $('#trainee-template').html()
        this.traineesContainer = $('#trainees-container')
        this.trainerName = $('#user-name')

        this.userSource = $('#User-status-template').html()
        this.userStatusContainer = $('#user-status-container')

        this.recipiesSource = $('#recipes-template').html()
        this.resultMealsContainer = $('#resultMealsContainer')

        this.tableSource = $('#table-template').html()
        this.tableContainer =$('#weeklyPlan')
    }
    renderTainees(trainer){
        this.traineesContainer.empty()
        this.trainerName.text(trainer.firstName)
        const template = Handlebars.compile(this.traineeSource)
        const html = template(trainer)
        this.traineesContainer.append(html)
    }

    renderUserStatus(user){
        this.userStatusContainer.empty()
        const rendringUser = {...user}
        rendringUser.status= rendringUser.status[rendringUser.status.length-1]
        const template = Handlebars.compile(this.userSource)
        const html = template(rendringUser)
        this.userStatusContainer.append(html)

    }
    renderRecipies(recipies){
        this.resultMealsContainer.empty()
        const template = Handlebars.compile(this.recipiesSource)
        const html = template({recipies})
        this.resultMealsContainer.append(html)
    }
    renderTable(weeklyPlan){
        this.tableContainer.empty()
        const template = Handlebars.compile(this.tableSource)
        const html = template(weeklyPlan)
        this.tableContainer.append(html)
    }
 
}