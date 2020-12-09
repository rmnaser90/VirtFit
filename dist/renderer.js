class Renderer {
    constructor() {
        const signInSource = $('#sign-in-template').html();
        this.signInTemplate = Handlebars.compile(signInSource);

        const strainerSignInSource = $('#trainer-sign-in-template').html();
        this.trainerSignInTemplate = Handlebars.compile(strainerSignInSource);

        const signUpSource = $('#sign-up-template').html();
        this.signUpTemplate = Handlebars.compile(signUpSource);

        const trainerSignUpSource = $('#trainer-sign-up-template').html();
        this.trainerSignUpTemplate = Handlebars.compile(trainerSignUpSource);
    }

    _handleBarAppender = (Template) => {
        let newHTML = Template();
        $('#sign-in-sign-up').empty().append(newHTML);
    }

    renderSignIn = () => this._handleBarAppender(this.signInTemplate)
    renderSignUp = () => this._handleBarAppender(this.signUpTemplate)

    renderTrainerSignIn = () => this._handleBarAppender(this.trainerSignInTemplate)
    renderTrainerSignUp = () => this._handleBarAppender(this.trainerSignUpTemplate)
}