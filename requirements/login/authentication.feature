Feature: User Login
Como um usuário desconectado
Quero poder efetuar o login no site
Para que eu possa deletar minhas urls.

Scenario: Dados válidos
    Given: Dado que o usuário inseriu informações válidas
    When: Quando o usuário solicitar pra efetuar o login
    Then: Então o sistema deve retornar um sinal indicando que o login foi feito com sucesso
    And: E deve redirecionar o usuário pra página principal, e manter ele logado.
Scenario: Credenciais Inválidas
    Given: Dado que o usuário inseriu informações Inválidas
    When: Quando o usuário solicitar pra efetuar o login
    Then: Então o sistema deve retornar uma mensagem de erro