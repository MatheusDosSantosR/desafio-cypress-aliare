class TransferPage {
    // Seletores
    elements = {
        accountInput: () => cy.get('input[name="accountNumber"]'),  // Campo de conta
        accountDigitInput: () => cy.get('input[name="digit"]'),
        amountInput: () => cy.get('input[name="transferValue"]'),   // Campo de valor
        descriptionInput: () => cy.get('input[name="description"]'), // Campo de descrição
        transferButton: () => cy.contains('button', 'Transferir agora'),   // Botão de transferência
        successMessage: () => cy.get('#modalText'),    // Mensagem de sucesso
        errorMessage: () => cy.get('#modalText'),        // Mensagem de erro
        balance: () => cy.get('#textBalance > span'),             // Saldo atualizado
        btnCloseModal: () => cy.get('#btnCloseModal'), // Botão de fechar modal
        btnBack: () => cy.get('#btnBack') // Botão de voltar
    };

    // Métodos
    visit() {
        cy.visit('/transfer');
    }

    fillAccount(account) {
        this.elements.accountInput().type(account);
    }

    fillAccountDigit(digit) {
        this.elements.accountDigitInput().type(digit);
    }

    fillAmount(amount) {
        this.elements.amountInput().type(amount);
    }

    fillDescription(description) {
        this.elements.descriptionInput().type(description);
    }

    submitForm() {
        this.elements.transferButton().should('be.visible').click({ force: true });
    }

    validateSuccessMessage(message) {
        this.elements.successMessage().should('contain.text', message);
    }

    validateErrorMessage(message) {
        this.elements.errorMessage().should('contain.text', message);
    }

    validateBalance(expectedBalance) {
        this.elements.balance().should('be.visible').and('contains.text', expectedBalance);
    }

    closeModal() {
        this.elements.btnCloseModal().click();
    }

    backToHome() {
        this.elements.btnBack().click();
    }

}

export default new TransferPage();
