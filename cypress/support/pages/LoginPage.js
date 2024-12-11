class LoginPage {
    // Seletores
    elements = {
        emailInput: () => cy.get('input[type="email"]:visible'),
        passwordInput: () => cy.get("input[name='password']:visible"),
        loginButton: () => cy.contains('button', 'Acessar'),
        errorMessage: () => cy.get('#modalText'),
        homeSuccessMessage: () => cy.contains('p', 'bem vindo ao BugBank :)'),
        myAccountTag: () => cy.get('h1').contains('My account'),
    };

    // Métodos
    visit() {
        cy.visit('/');
    }

    fillEmail(email) {
        this.elements.emailInput().type(email);
    }

    fillPassword(password) {
        this.elements.passwordInput().type(password);
    }

    submitForm() {
        this.elements.loginButton().click();
    }

    validateErrorMessage(message) {
        this.elements.errorMessage().should('contain.text', message);
    }

    validateInputErrorMessage(message) {
        this.elements.emailInput().parent().find('p').should('contain.text', message);
    }

    validateSuccessMessageLogin() {
        this.elements.homeSuccessMessage().should('be.visible');
    }

}

export default new LoginPage();
