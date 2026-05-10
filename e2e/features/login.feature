Feature: Login

  Background:
    Given que estou na página de login

  Scenario: Login com sucesso
    When realizo login com credenciais válidas
    Then devo ver a página de produtos

  Scenario: Login inválido
    When realizo login com senha inválida
    Then devo ver uma mensagem de erro

  Scenario: Login com campos vazios
    When realizo login sem preencher credenciais
    Then devo ver uma mensagem de erro