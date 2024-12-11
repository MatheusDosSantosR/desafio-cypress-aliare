class RegisterPage {
    elements = {
        nameInput: () => cy.get('.card__register > form > div > input[name="name"]'),
        emailInput: () => cy.get('.card__register > form > div > input[name="email"]'),
        passwordInput: () => cy.get('input[name="password"]:last'),
        confirmPasswordInput: () => cy.get('input[name="passwordConfirmation"]'),
        submitButton: () => cy.contains('button', 'Cadastrar'),
        successMessage: () => cy.get('#modalText'),
        messageModalText: () => cy.get('#modalText'),
        btnCloseModal: () => cy.get('#btnCloseModal'),
        inputMessageError: (message) => cy.contains('p', message),
    };

    visit() {
        cy.visit('/');
        cy.contains('button', 'Registrar').click();
        cy.wait(1000);
    }
    //Possui alguns problema ao preencher os campos, pois o cypress não está conseguindo encontrar os campos
    //Acredito que seja mensagem de senha insegura do proprio navegador que esta sobrepondo os campos
    fillName(name) {
        this.elements.nameInput().type(name, { force: true });
    }

    fillEmail(email) {
        this.elements.emailInput().type(email, { force: true });
    }

    fillPassword(password) {
        this.elements.passwordInput().type(password, { force: true });
    }

    fillConfirmPassword(password) {
        this.elements.confirmPasswordInput().type(password, { force: true });
    }

    submitForm() {
        this.elements.submitButton().click({ force: true });
    }

    validateErrorMessage(message) {
        this.elements.messageModalText().should('contain.text', message);
    }

    validateSuccessMessage(message) {
        this.elements.successMessage().should('contains.text', message);
    }

    closeModal() {
        this.elements.btnCloseModal().click();
    }

    validateInputErrorMessage(message) {
        this.elements.inputMessageError(message).should('contain.text', message);
    }
}

export default new RegisterPage();
