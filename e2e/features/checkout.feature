Feature: Checkout

  Scenario: Compra realizada com sucesso
    Given que estou logado na aplicação
    When adiciono um produto ao carrinho
    And vou para o carrinho
    And finalizo a compra com dados válidos
    Then devo ver a confirmação de compra

  Scenario: Checkout com dados inválidos
    Given que estou logado na aplicação
    When adiciono um produto ao carrinho
    And vou para o carrinho
    And tento finalizar a compra sem preencher dados
    Then devo ver uma mensagem de erro no checkout