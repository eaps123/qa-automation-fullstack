Feature: Login

  Background:
    Given que estou na página de login

  @smoke
  Scenario: Login com sucesso
    When realizo login com usuário "standard"
    Then devo ver a página de produtos

  @negative
  Scenario Outline: Login inválido
    When realizo login com usuário "<username>" e senha "<password>"
    Then devo ver a mensagem "<message>"

    Examples:
      | username      | password       | message              |
      | standard_user | wrong_password | Epic sadface         |
      |               |                | Username is required |