import ExtractPage from '../support/pages/ExtractPage';
import HomePage from '../support/pages/HomePage';
import TransferPage from '../support/pages/TransferPage';

describe('Página de extrato', () => {
    beforeEach(() => {
        cy.fixture('users').as('users').then((users) => {
            cy.createAccountInLocalStorage(users[0]);
            cy.createAccountInLocalStorage(users[1]);
            cy.loginViaUI(users[0].email, users[0].password);
        });
    });

    it('deve exibir transações recentes', function () {
        HomePage.goToTransactions();
        //Realiza uma transferência pelo painel de transferências
        const userReceiver = this.users[1];
        TransferPage.fillAccount(userReceiver.accountNumber);
        TransferPage.fillAccountDigit(userReceiver.accountDigit);
        TransferPage.fillAmount('100');
        TransferPage.fillDescription('Pagamento Teste');
        TransferPage.submitForm();
        TransferPage.closeModal();
        TransferPage.backToHome();

        //Acessa o extrato

        HomePage.goToExtract();

        // Verificar se há 2 transações no extrato
        ExtractPage.validateTransactionCount(2);
    });

    it('deve exibir mensagem vazia para nenhuma transação', () => {
        HomePage.goToExtract();
        ExtractPage.validateTransactionCount(1);
    });

    it('deverá validar o saldo ', () => {
        HomePage.goToExtract();
        // Verifica se o saldo exibido corresponde ao esperado
        ExtractPage.validateBalance('1.000,00');
    });
});
