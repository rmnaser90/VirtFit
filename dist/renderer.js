class Renderer {
    constructor() {
        const signInSource = $('#sign-in-template').html();
        this.signInTemplate = Handlebars.compile(signInSource);

        const signUpSource = $('#sign-up-template').html();
        this.signUpTemplate = Handlebars.compile(signUpSource);
    }

    _handleBarAppender = (Template) => {
        let newHTML = Template();
        $('#sign-in-sign-up').empty().append(newHTML);
    }

    renderSignIn = () => this._handleBarAppender(this.signInTemplate)
    renderSignUp = () => this._handleBarAppender(this.signUpTemplate)
}