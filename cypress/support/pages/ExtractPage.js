class ExtractPage {
    // Seletores
    elements = {
        transactions: () => cy.get('.transaction-item'), // Transações
        balance: () => cy.get('#textBalanceAvailable'), // Saldo disponível
        transactionDetails: () => cy.get('.transaction-details'), // Detalhes da transação
        descriptionTransaction: () => cy.get('#textDescription'), // Descrição da transação
        typeTransaction: () => cy.get('div > #textTypeTransaction'), // Tipo da transação
    };

    // Métodos
    validateTransactionCount(count) {
        this.elements.typeTransaction().should('have.length', count);
    }

    validateBalance(expectedBalance) {
        this.elements.balance().should('contains.text', expectedBalance);
    }

    openTransactionDetails(index) {
        this.elements.typeTransaction().eq(index).click();
    }

    validateTransactionDetails(details) {
        this.elements.transactionDetails().should('contain.text', details);
    }
}

export default new ExtractPage();
