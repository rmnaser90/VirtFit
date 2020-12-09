class Renderer {
    constructor() {
       
        this.traineeSource = $('#trainee-template').html()
        this.traineesContainer = $('#trainees-container')
        this.trainerName = $('#user-name')

        this.userSource = $('#User-status-template').html()
        this.userStatusContainer = $('#user-status-container')
    }
    renderTainees(trainer){
        this.trainerName.text(trainer.firstName)
        const template = Handlebars.compile(this.traineeSource)
        const html = template(trainer)
        this.traineesContainer.append(html)
    }

    renderUserStatus(user){
        const rendringUser = {...user}
        rendringUser.status= rendringUser.status[rendringUser.status.length-1]
        const template = Handlebars.compile(this.userSource)
        const html = template(rendringUser)
        this.userStatusContainer.append(html)

    }
 
}