import LoginPage from '../support/pages/LoginPage';

describe('Login de usuário', () => {
    beforeEach(() => {
        //Cadastra usuários válidos e no LocalStorage 
        //Se fosse sistema real, seria no banco de dados ou API
        cy.fixture('users').as('users').then((users) => {
            cy.createAccountInLocalStorage(users[0]);
        });
        LoginPage.visit();
    });

    it('deve fazer login com sucesso com credenciais válidas', function () {
        console.log(this.users);
        LoginPage.fillEmail(this.users[0].email);
        LoginPage.fillPassword(this.users[0].password);
        LoginPage.submitForm();
        LoginPage.validateSuccessMessageLogin();
    });

    it('deve mostrar um erro para credenciais inválidas', () => {
        LoginPage.fillEmail('invaliduser@example.com');
        LoginPage.fillPassword('WrongPassword123');
        LoginPage.submitForm();

        LoginPage.validateErrorMessage('Usuário ou senha inválido.\nTente novamente ou verifique suas informações!');
    });

    it('should show errors for missing required fields', () => {
        LoginPage.submitForm();
        LoginPage.validateInputErrorMessage('É campo obrigatório');
    });

    it('should show an error for invalid email format', () => {
        LoginPage.fillEmail('invalid-email');
        LoginPage.fillPassword('ValidPassword123');
        LoginPage.submitForm();

        LoginPage.validateInputErrorMessage('Formato inválido');
    });

    it.only('should show an error for blocked account', () => {
        LoginPage.fillEmail('blockeduser@example.com');
        LoginPage.fillPassword('ValidPassword123');
        LoginPage.submitForm();

        LoginPage.validateErrorMessage('Usuário ou senha inválido.\nTente novamente ou verifique suas informações!');
    });
});
