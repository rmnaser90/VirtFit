class Renderer {
    constructor() {
       
        this.traineeSource = $('#trainee-template').html()
        this.traineesContainer = $('#trainees-container')
        this.trainerName = $('#user-name')
    }
    renderTainees(trainer){
        this.trainerName.text(trainer.firstName)
        const template = Handlebars.compile(this.traineeSource)
        const html = template(trainer)
        this.traineesContainer.append(html)
    }
 
}