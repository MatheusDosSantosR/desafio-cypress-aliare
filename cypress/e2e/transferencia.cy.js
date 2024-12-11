import TransferPage from '../support/pages/TransferPage';
import HomePage from '../support/pages/HomePage';

describe('Página de transferência', () => {
    beforeEach(() => {
        //Cadastra usuários válidos e no LocalStorage 
        //Se fosse sistema real, seria no banco de dados ou API
        cy.fixture('users').as('users').then((users) => {
            cy.createAccountInLocalStorage(users[0]);
            cy.createAccountInLocalStorage(users[1]);
            cy.loginViaUI(users[0].email, users[0].password);
        });
        HomePage.goToTransactions();
    });


    //Bug precisa clicar duas vezes no botão de transferir
    it('deve concluir uma transferência com sucesso', function () {
        const userReceiver = this.users[1];
        TransferPage.fillAccount(userReceiver.accountNumber);
        TransferPage.fillAccountDigit(userReceiver.accountDigit);
        TransferPage.fillAmount('100');
        TransferPage.fillDescription('Pagamento Teste');
        TransferPage.submitForm();

        TransferPage.validateSuccessMessage('Transferencia realizada com sucesso');
        TransferPage.closeModal();
        TransferPage.backToHome();
        TransferPage.validateBalance('900,00');
    });

    it('deve mostrar um erro por saldo insuficiente', function () {
        const userReceiver = this.users[1];
        TransferPage.fillAccount(userReceiver.accountNumber);
        TransferPage.fillAccountDigit(userReceiver.accountDigit);
        TransferPage.fillAmount('5000.00'); // Valor superior ao saldo disponível
        TransferPage.fillDescription('Tentativa com saldo insuficiente');
        TransferPage.submitForm();

        TransferPage.validateErrorMessage('Você não tem saldo suficiente para essa transação');
    });

    it('deve mostrar um erro para conta inválida', () => {
        TransferPage.fillAccount('00000-0'); // Conta inválida
        TransferPage.fillAmount('50.00');
        TransferPage.fillDescription('Tentativa com conta inexistente');
        TransferPage.submitForm();

        TransferPage.validateErrorMessage('Conta inválida ou inexistente');
    });

    //Bug: Mensagem de erro não está sendo exibida
    it('deve mostrar erros para campos obrigatórios ausentes', () => {
        TransferPage.submitForm();

        TransferPage.validateErrorMessage('Todos os campos são obrigatórios');
    });

    it.only('deve mostrar um erro para valor inválido', () => {
        TransferPage.fillAccount('12345-6');
        TransferPage.fillAmount('-100.00'); // Valor negativo
        TransferPage.fillDescription('Tentativa com valor inválido');
        TransferPage.submitForm();

        TransferPage.validateErrorMessage('Valor da transferência não pode ser 0 ou negativo');
    });
});
