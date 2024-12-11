# Cypress Test Suite

Este projeto contém um conjunto de testes automatizados utilizando **Cypress**, com suporte para comandos customizados para login e outras interações.

## **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

- Node.js (versão 20 ou superior)
- npm (gerenciado junto com o Node.js)
- Cypress (instalado como dependência do projeto)

---

## **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/desafio-cypress-aliare.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o Cypress:
   ```bash
   npx cypress open
   ```

---

## **Estrutura do Projeto**

Abaixo está a estrutura principal do projeto Cypress:

```
cypress/
├── e2e/                    # Arquivos de teste
│   └── login.cy.js
│   └── cadastro.cy.js      # Teste de cadastro de usuario
│   └── transferencia.cy.js # Teste de transferencias
│   └── extrato.cy.js       # Testes de extrato
└── support/                # Configurações e comandos personalizados
    ├── commands.js         # Custom Commands
    ├── pages/              # Page Objects
    │   ├── LoginPage.js
    │   ├── RegisterPage.js
    │   ├── TransferPage.js
    │   └── ExtractPage.js
    │   └── HomePage.js
```

---

## **Comandos Personalizados**

### Login via Interface
Comando para realizar login utilizando os elementos da interface:

```javascript
Cypress.Commands.add('loginViaUI', (email, password) => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button', 'Login').click();
});
```

### Criar Conta Direto no LocalStorage
Comando para criar uma conta diretamente no LocalStorage:

```javascript
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
    })
```

---

## **Execução dos Testes**

### Testes na Interface Gráfica

Para abrir o Cypress com a interface gráfica:
```bash
npx cypress open
```

### Testes em Modo Headless

Para executar os testes diretamente no terminal:
```bash
npx cypress run
```

### Executar Testes de um Arquivo Específico

Use o comando abaixo para rodar testes específicos:
```bash
npx cypress run --spec cypress/e2e/login.cy.js
```

---

#### Casos de Testes

##### (CD) Cadastro

* CD.1: Cadastro com e-mail inválido

| Passo | Descrição do passo                  | Resultado esperado                                                              |
| ----- | ----------------------------------- | ------------------------------------------------------------------------------- |
| 1     | Acesse a aplicação                  |                                                                                 |
| 2     | Clique no botão 'Registrar'         | Sistema deve apresentar a tela de cadastros                                     |
| 3     | Informe o e-mail "email_errado.com" | Sistema deve apresentar a mensagem "Formato inválido" abaixo do campo de e-mail |

* CD.2: Cadastro com e-mail válido

| Passo | Descrição do passo                      | Resultado esperado                         |
| ----- | --------------------------------------- | ------------------------------------------ |
| 1     | Acesse a aplicação                      |                                            |
| 2     | Clique no botão 'Registrar'             |                                            |
| 3     | Informe o e-mail 'test@test.com'        |                                            |
| 4     | Informe um nome válido                  |                                            |
| 5     | Informe uma senha válida                |                                            |
| 6     | Repita a senha informada no passo 5     |                                            |
| 7     | Marque a opção 'Criar conta com saldo?' |                                            |
| 8     | Clicar em 'Cadastrar'                   | Sistema deve cadastrar o usuário sem erros |

* CD.3: Cadastro com e-mail já cadastrado

| Passo | Descrição do passo                         | Resultado esperado                                  |
| ----- | ------------------------------------------ | --------------------------------------------------- |
| 1     | Acesse a aplicação                         |                                                     |
| 2     | Clique no botão 'Registrar'                |                                                     |
| 3     | Informe um e-mail que já esteja cadastrado |                                                     |
| 4     | Informe um nome válido                     |                                                     |
| 5     | Informe uma senha válida                   |                                                     |
| 6     | Repita a senha informada no passo 5        |                                                     |
| 7     | Clicar em 'Cadastrar'                      | Sistema deve exibir mensagem de e-mail ja utilizado |

* CD.4: Cadastro sem preencher os campos obrigatorios

| Passo | Descrição do passo          | Resultado esperado                                                   |
| ----- | --------------------------- | -------------------------------------------------------------------- |
| 1     | Acesse a aplicação          |                                                                      |
| 2     | Clique no botão 'Registrar' |                                                                      |
| 7     | Clicar em 'Cadastrar'       | Sistema deve exibir de e necessario preencher os campos obrigatorios |

* CD.5: Cadastro com senha muito curta

| Passo | Descrição do passo                         | Resultado esperado                                                       |
| ----- | ------------------------------------------ | ------------------------------------------------------------------------ |
| 1     | Acesse a aplicação                         |                                                                          |
| 2     | Clique no botão 'Registrar'                |                                                                          |
| 3     | Informe um e-mail que já esteja cadastrado |                                                                          |
| 4     | Informe um nome válido                     |                                                                          |
| 5     | Informe uma senha com 3 caracteres         |                                                                          |
| 6     | Repita a senha informada no passo 5        |                                                                          |
| 7     | Clicar em 'Cadastrar'                      | Sistema deve exibir mensagem de a senha deve conter mais de 6 caracteres |

* CD.6: Cadastro com senha muito curta

| Passo | Descrição do passo                         | Resultado esperado                                    |
| ----- | ------------------------------------------ | ----------------------------------------------------- |
| 1     | Acesse a aplicação                         |                                                       |
| 2     | Clique no botão 'Registrar'                |                                                       |
| 3     | Informe um e-mail que já esteja cadastrado |                                                       |
| 4     | Informe um nome inválido                   |                                                       |
| 5     | Informe uma senha válida                   |                                                       |
| 6     | Repita a senha informada no passo 5        |                                                       |
| 7     | Clicar em 'Cadastrar'                      | Sistema deve exibir mensagem de que o nome e inválido |


##### (LG) Login

* LG.1: Login com e-mail inválido

| Passo | Descrição do passo                  | Resultado esperado                                                          |
| ----- | ----------------------------------- | --------------------------------------------------------------------------- |
| 1     | Acesse a aplicação                  |                                                                             |
| 2     | Informe o e-mail 'email_errado.com' | Sistema deve exibir a mensagem 'Formato inválido' abaixo do campo de e-mail |

* LG.2: Login com e-mail inválido/senha não cadastrados

| Passo | Descrição do passo                          | Resultado esperado                                                                                            |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1     | Acesse a aplicação                          |                                                                                                               |
| 2     | Informe um e-mail que não estava cadastrado |                                                                                                               |
| 3     | Informe uma senha qualquer                  |                                                                                                               |
| 4     | Clique em 'Acessar'                         | Sistema deve apresentar a mensagem "Usuário ou senha inválido. Tente novamente ou verifique suas informações! |

* LG.3: Login com usuário/senha válidos

| Passo | Descrição do passo                               | Resultado esperado                                     |
| ----- | ------------------------------------------------ | ------------------------------------------------------ |
| 1     | Acesse a aplicação                               |                                                        |
| 2     | Informe um e-mail previamente cadastrado         |                                                        |
| 3     | Informe a senha correta para o e-mail cadastrado |                                                        |
| 4     | Clique em 'Acessar'                              | Sistema deve permitir o login                          |
| 5     | Na página inicial                                | Sistema deve apresentar o nome do usuário corretamente |
| 6     | Na página inicial                                | Sistema deve apresentar a conta correta                |

##### (EX) Extrato

* EX.1: Visualizar extrato com transações recentes

| Passo | Descrição do passo                      | Resultado esperado                              |
| ----- | --------------------------------------- | ----------------------------------------------- |
| 1     | Acesse a aplicação                      |                                                 |
| 2     | Realize o login com credenciais válidas |                                                 |
| 3     | Acesse a funcionalidade de extrato      |                                                 |
| 4     | Verifique a exibição das transações     | Sistema deve listar as transações mais recentes |

* EX.2: Visualizar extrato vazio

| Passo | Descrição do passo                      | Resultado esperado                                            |
| ----- | --------------------------------------- | ------------------------------------------------------------- |
| 1     | Acesse a aplicação                      |                                                               |
| 2     | Realize o login com credenciais válidas |                                                               |
| 3     | Acesse a funcionalidade de extrato      |                                                               |
| 4     | Verifique a exibição das transações     | Sistema deve exibir a mensagem 'Nenhuma transação encontrada' |

* EX.3: Filtrar transações por data

| Passo | Descrição do passo                        | Resultado esperado                                              |
| ----- | ----------------------------------------- | --------------------------------------------------------------- |
| 1     | Acesse a aplicação                        |                                                                 |
| 2     | Realize o login com credenciais válidas   |                                                                 |
| 3     | Acesse a funcionalidade de extrato        |                                                                 |
| 4     | Informe o intervalo de datas para filtrar |                                                                 |
| 5     | Clique em 'Filtrar'                       | Sistema deve exibir apenas as transações do intervalo informado |

##### (TR) Transferência

* TR.1: Transferência bem-sucedida

| Passo | Descrição do passo                          | Resultado esperado                                                            |
| ----- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| 1     | Acesse a aplicação                          |                                                                               |
| 2     | Realize o login com credenciais válidas     |                                                                               |
| 3     | Acesse a funcionalidade de transferência    |                                                                               |
| 4     | Informe a conta de destino e o valor válido |                                                                               |
| 5     | Clique em 'Transferir'                      | Sistema deve exibir mensagem de sucesso 'Transferência realizada com sucesso' |
| 6     | Verifique o saldo atualizado                | Saldo deve ser reduzido corretamente                                          |

* TR.2: Transferência com saldo insuficiente

| Passo | Descrição do passo                                                 | Resultado esperado                                  |
| ----- | ------------------------------------------------------------------ | --------------------------------------------------- |
| 1     | Acesse a aplicação                                                 |                                                     |
| 2     | Realize o login com credenciais válidas                            |                                                     |
| 3     | Acesse a funcionalidade de transferência                           |                                                     |
| 4     | Informe a conta de destino e um valor maior que o saldo disponível |                                                     |
| 5     | Clique em 'Transferir'                                             | Sistema deve exibir a mensagem 'Saldo insuficiente' |

* TR.3: Transferência para conta inválida

| Passo | Descrição do passo                         | Resultado esperado                                 |
| ----- | ------------------------------------------ | -------------------------------------------------- |
| 1     | Acesse a aplicação                         |                                                    |
| 2     | Realize o login com credenciais válidas    |                                                    |
| 3     | Acesse a funcionalidade de transferência   |                                                    |
| 4     | Informe uma conta inexistente como destino |                                                    |
| 5     | Clique em 'Transferir'                     | Sistema deve exibir a mensagem 'Conta inexistente' |

* TR.4: Transferência para conta inválida

| Passo | Descrição do passo                       | Resultado esperado                                             |
| ----- | ---------------------------------------- | -------------------------------------------------------------- |
| 1     | Acesse a aplicação                       |                                                                |
| 2     | Realize o login com credenciais válidas  |                                                                |
| 3     | Acesse a funcionalidade de transferência |                                                                |
| 5     | Clique em 'Transferir'                   | Sistema deve exibir a mensagem 'Preencher campos obrigatorios' |

---

## **Boas Práticas**

1. **Reutilização de Código:**
   - Utilize os comandos personalizados para evitar duplicação de lógica em diferentes testes.

2. **Mock de Dados:**
   - Use o `cy.intercept` para simular respostas de API, garantindo maior controle sobre os cenários.

3. **Separação de Lógica:**
   - Utilize Page Objects para encapsular os seletores e interações com a página.

---

## **Tecnologias Utilizadas**

- **Cypress:** Framework para testes end-to-end.
- **JavaScript (ES6+):** Linguagem utilizada nos testes.
- **LocalStorage:** Manipulação direta para simular estados do usuário.

---

## **Contribuição**

Se desejar contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações:
   ```bash
   git checkout -b minha-feature
   ```
3. Envie um pull request quando sua alteração estiver pronta.

---

## **Licença**

Este projeto está sob a licença [MIT](LICENSE).

---

**Desenvolvido por Matheus** 🚀
