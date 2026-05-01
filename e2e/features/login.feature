Feature: Login

  Scenario: Login com sucesso
    Given que estou na página de login
    When eu faço login com usuário válido
    Then devo ver a página de produtos

  Scenario: Login inválido
    Given que estou na página de login
    When eu faço login com senha inválida
    Then devo ver uma mensagem de erro

  Scenario: Login após logout deve funcionar corretamente
    Given que estou logado na aplicação
    When faço logout
    And realizo login novamente
    Then devo ver a página de produtos