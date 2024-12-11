import LoginPage from "./pages/LoginPage";

Cypress.Commands.add('createAccountInLocalStorage', (objUser) => {
    const accountData = {
        name: objUser.name,
        email: objUser.email,
        password: objUser.password,
        accountNumber: objUser.accountNumber + '-' + objUser.accountDigit,
        balance: objUser.balance,
        logged: objUser.logged || false,
    };

    const transactionData = [
        {
            "id": generateUUID(),
            "date": dateNow(),
            "type": "Abertura de conta",
            "transferValue": objUser.balance,
            "description": "Saldo adicionado ao abrir conta"
        }];

    cy.window().then((win) => {
        win.localStorage.setItem(accountData.email, JSON.stringify(accountData));
    });

    cy.window().then((win) => {
        win.localStorage.setItem("transaction:" + accountData.email, JSON.stringify(transactionData));
    });
});

Cypress.Commands.add('loginViaUI', (email, password) => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });
    cy.visit('/');
    LoginPage.fillEmail(email);
    LoginPage.fillPassword(password);
    LoginPage.submitForm();
    LoginPage.validateSuccessMessageLogin();
});


/**
 * Função para retornar a data atual no formato DD/MM/YYYY
 *
 * @returns {string} A data atual formatada como DD/MM/YYYY.
 */
function dateNow() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}


/**
 * Gera um UUID (Identificador Universalmente Único) versão 4.
 * O UUID está no formato 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.
 *
 * @returns {string} Um UUID gerado aleatoriamente.
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
