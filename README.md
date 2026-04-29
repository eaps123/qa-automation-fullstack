# QA Automation Challenge

## 📖 Descrição
Projeto de automação cobrindo testes de API, E2E e carga.

Utilizei múltiplas APIs para cobrir diferentes cenários (CRUD, autenticação e dados reais), garantindo maior realismo e cobertura.
API:
1. Fake Store API
Para:
    CRUD (GET, POST, PUT, DELETE).

2. ReqRes
Para:
    autenticação,
    cenários negativos reai.

3. BrasilAPI
Para:
    validação de dados reais (ex: CEP).

## 🏗️ Estrutura
- api → testes de API
- e2e → testes E2E com Cucumber
- performance → testes de carga (K6)

## ⚙️ Tecnologias
- Playwright
- Cucumber
- K6
- GitHub Actions

## ▶️ Como executar

### Instalar dependências
npm install

### Rodar testes
npx playwright test

### Rodar K6
k6 run performance/load-test.js

## 📊 Relatórios
npm install cucumber-html-reporter --save-dev
npx playwright show-report