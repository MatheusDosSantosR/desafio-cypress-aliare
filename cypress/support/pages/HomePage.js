class HomePage {
    // Seletores
    elements = {
        linkTransactions: () => cy.get('#btn-TRANSFERÊNCIA'),
        linkExtract: () => cy.get('#btn-EXTRATO'),
        accountNumber: () => cy.get('#textAccountNumber > span'),
        accountName: () => cy.get('#textName'),

    };

    // Métodos
    goToTransactions() {
        this.elements.linkTransactions().click();
    }

    goToExtract() {
        this.elements.linkExtract().click();
    }

    validateNameHome(name) {
        this.elements.accountName().should('contain.text', `Olá ${name},`);
    }

    validateAccount(accountNumber) {
        this.elements.accountNumber().should('contain.text', accountNumber);
    }

}

export default new HomePage();