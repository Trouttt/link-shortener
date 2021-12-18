Feature: url Register
Como um anônimo OU usuário autenticado 
Quero poder encurtar uma url
Para que eu possa acessar quando eu quiser

Scenario: Dados válidos
    Given: Dado que o usuário inseriu uma url
    When: Quando o usuário solicitar pra efetuar o encurtamento da url
    Then: Então o sistema deve retornar um sinal indicando que o cadastro foi feito com sucesso
    And: E deve redirecionar o usuário pra página uma página de sucesso
Scenario: Dados inválidos
    Given: Dado que o usuário inseriu uma url inválida
    When: Quando o usuário solicitar pra efetuar o encurtamento da url
    Then: Então o sistema deve retornar uma mensagem de erro