class HomePage {
    // Seletores
    elements = {
        linkTransactions: () => cy.get('#btn-TRANSFERÊNCIA'),
        linkExtract: () => cy.get('#btn-EXTRATO'),
    };

    // Métodos
    goToTransactions() {
        this.elements.linkTransactions().click();
    }

    goToExtract() {
        this.elements.linkExtract().click();
    }

}

export default new HomePage();