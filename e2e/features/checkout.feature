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
  
  Scenario: Usuário tenta acessar checkout sem estar logado
    Given que não estou logado
    When tento acessar a página de checkout
    Then devo ser redirecionado para login
  
  Scenario: Não deve permitir finalizar compra com carrinho vazio
    Given que estou logado na aplicação
    When vou para o carrinho sem produtos
    And tento finalizar a compra
    Then devo ver uma mensagem de carrinho vazio
  
  Scenario: adiciono o produto {string} {int} vezes
    Given que estou logado na aplicação
    When adiciono o produto "sauce-labs-backpack" 2 vezes
    Then o carrinho deve refletir a quantidade correta