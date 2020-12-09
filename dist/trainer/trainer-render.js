class Renderer {
    constructor() {
       
        this.traineeSource = $('#trainee-template').html()
        this.traineesContainer = $('#trainees-container')
        this.trainerName = $('#user-name')

        this.userSource = $('#User-template')
        this.userStatusContainer = $('#user-status-container')
    }
    renderTainees(trainer){
        this.trainerName.text(trainer.firstName)
        const template = Handlebars.compile(this.traineeSource)
        const html = template(trainer)
        this.traineesContainer.append(html)
    }

    renderUserStatus(user){
        const template = Handlebars.compile(this.userSource)
        const html = template(user)
        this.userStatusContainer.append(html)

    }
 
}