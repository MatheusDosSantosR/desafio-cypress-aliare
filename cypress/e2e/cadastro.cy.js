import RegisterPage from '../support/pages/RegisterPage';

describe('Registro de usuário', () => {
    beforeEach(() => {
        RegisterPage.visit();
    });

    it('deve registrar-se com sucesso com dados válidos', () => {
        RegisterPage.fillEmail('test@test.com');
        RegisterPage.fillName('Test User');
        RegisterPage.fillPassword('Test@123');
        RegisterPage.fillConfirmPassword('Test@123');
        RegisterPage.submitForm();

        RegisterPage.validateSuccessMessage('foi criada com sucesso');
        RegisterPage.closeModal();
    });

    //Teste com bug pois não deveria permitir o cadastro de um email já cadastrado
    it('deve mostrar um erro para um e-mail já registrado', () => {
        cy.fixture('users').then((users) => {
            cy.createAccountInLocalStorage(users[0]);
            RegisterPage.fillEmail(users[0].email);
        });
        RegisterPage.fillName('Test User');
        RegisterPage.fillPassword('Test@123');
        RegisterPage.fillConfirmPassword('Test@123');
        RegisterPage.submitForm();

        RegisterPage.validateErrorMessage('E-mail já registrado');
    });

    it('deve mostrar erros para campos obrigatórios ausentes', () => {
        RegisterPage.submitForm();
        RegisterPage.validateInputErrorMessage('É campo obrigatório');
    });

    it('deve mostrar um erro para formato de e-mail inválido', () => {
        RegisterPage.fillName('Test User');
        RegisterPage.fillEmail('email_errado.com');
        RegisterPage.fillPassword('Test@123');
        RegisterPage.fillConfirmPassword('Test@123');
        RegisterPage.submitForm();

        RegisterPage.validateInputErrorMessage('Formato inválido');
    });

    it('deve mostrar um erro para senhas incompatíveis', () => {
        RegisterPage.fillName('Test User');
        RegisterPage.fillEmail('testuser@example.com');
        RegisterPage.fillPassword('Test@123');
        RegisterPage.fillConfirmPassword('Mismatch@123');
        RegisterPage.submitForm();

        RegisterPage.validateErrorMessage('As senhas não são iguais.');
    });


    //Nao possui minimos de caracteres para senha
    it('deve mostrar um erro para uma senha muito curta', () => {
        RegisterPage.fillName('Test User');
        RegisterPage.fillEmail('testuser@example.com');
        RegisterPage.fillPassword('123');
        RegisterPage.fillConfirmPassword('123');
        RegisterPage.submitForm();

        RegisterPage.validateErrorMessage('A senha deve ter pelo menos 6 caracteres');
    });


    // Nao possui tratativa de caracteres especiais no nome
    it('deve mostrar um erro para caracteres inválidos no nome', () => {
        RegisterPage.fillName('Invalid@#Name');
        RegisterPage.fillEmail('testuser@example.com');
        RegisterPage.fillPassword('Test@123');
        RegisterPage.fillConfirmPassword('Test@123');
        RegisterPage.submitForm();

        RegisterPage.validateErrorMessage('Nome inválido');
    });
});
