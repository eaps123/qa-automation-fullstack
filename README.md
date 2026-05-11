## 📊 Status do Projeto

![CI](https://github.com/eaps123/qa-automation-fullstack/actions/workflows/ci.yml/badge.svg)

---

# 🧪 QA Automation Challenge

Projeto de automação de testes cobrindo **API, E2E e testes de performance**, utilizando boas práticas de arquitetura, organização e escalabilidade aplicadas em projetos enterprise de QA Automation.

> Projeto atualizado com refatorações recentes focadas em escalabilidade, redução de duplicação e aumento de reutilização em testes E2E com Cucumber + Playwright.

---

## 📌 Objetivo

Demonstrar habilidades práticas em:

- Testes E2E com Playwright + Cucumber
- Testes de API REST
- Testes de contrato com Zod
- Testes de performance com K6
- Integração contínua com GitHub Actions
- Geração automática de evidências e relatórios

---

## 📖 Descrição

O projeto foi desenvolvido para validar diferentes camadas de uma aplicação utilizando APIs públicas e aplicação web real.

A arquitetura foi organizada seguindo padrões enterprise de automação, separando responsabilidades em:

- clients
- services
- factories
- schemas
- tests

Além disso, foi implementada separação de ambientes (`dev`, `qa` e `prd`) para evitar hardcodes e facilitar manutenção futura.

---

## 🔹 APIs utilizadas

### dummyjson

Utilizada para:

- autenticação
- cenários de CRUD
- testes positivos e negativos
- simulação de API REST

📍 https://dummyjson.com

---

### ViaCEP

Utilizada para:

- validação de dados reais
- consulta de CEP
- validação de contratos reais

📍 https://viacep.com.br

---

## 🏗️ Estrutura do Projeto

```bash
qa-automation-fullstack/
├── api/
│   ├── clients/
│   │   └── apiClient.ts
│   │
│   ├── factories/
│   │   ├── auth.factory.ts
│   │   ├── cart.factory.ts
│   │   └── product.factory.ts
│   │
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   ├── cart.schema.ts
│   │   ├── cep.schema.ts
│   │   └── product.schema.ts
│   │
│   ├── services/
│   │   ├── AuthService.ts
│   │   ├── CartService.ts
│   │   ├── CepService.ts
│   │   └── ProductService.ts
│   │
│   └── tests/
│       ├── auth.spec.ts
│       ├── cart.spec.ts
│       ├── cep.spec.ts
│       └── products.spec.ts
│
├── config/
│   ├── data/
│   │   ├── checkout.ts
│   │   └── users.ts
│   │ 
│   └── env/
│       ├── dev.ts
│       ├── qa.ts
│       ├── prd.ts
│       └── index.ts
│
├── e2e/
│   ├── factories/
│   │   └── checkout.factory.ts
│   │ 
│   ├── features/
│   │   ├── checkout.feature
│   │   └── login.feature
│   │ 
│   ├── pages/
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── InventoryPage.ts
│   │   └── LoginPage.ts
│   │ 
│   ├── steps/
│   │   ├── checkout.steps.ts
│   │   └── login.steps.ts
│   │ 
│   ├── support/
│   │   ├── hooks.ts
│   │   └── world.ts
│   │ 
│   └── utils/
│       ├── faker.ts
│       └── helpers.ts
│
├── performance/
│   ├── load-test.js
│   └── config.js
│
├── reports/
│   ├── playwright-report/
│   ├── screenshots/
│   ├── videos/
│   └── index.html
│
├── scripts/
│   ├── generate-api-summary.js
│   ├── generate-performance-analysis.js
│   └── generate-report.js
│
├── .github/workflows/ci.yml
│
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Cobertura de Testes

### 🔹 API

#### Products

- ✔️ GET produtos
- ✔️ POST produto
- ✔️ PUT produto
- ✔️ DELETE produto

#### Cart

- ✔️ Criação de carrinho
- ✔️ Atualização de carrinho
- ✔️ Payload inválido

#### Auth

- ✔️ Login válido
- ✔️ Login inválido
- ✔️ Validação de autenticação

#### CEP

- ✔️ Consulta de CEP válido
- ✔️ Consulta de CEP inválido
- ✔️ Validação de dados reais

---

### 🔹 Testes de Contrato (Zod)

Validação de contrato implementada utilizando **Zod Schemas** para garantir:

- ✔️ Estrutura do response
- ✔️ Tipagem dos dados
- ✔️ Contrato esperado da API
- ✔️ Proteção contra breaking changes

---

### 🔹 E2E (BDD com Cucumber + Page Objects + Factories)

Framework de automação estruturado com:

- Cucumber (BDD)
- Playwright
- Page Object Model
- Factories para geração de massa de teste
- Steps reutilizáveis e parametrizados
- Validações dinâmicas de UI

#### 🔐 Login
- Login com múltiplos perfis de usuário (dinâmico via step parameter)
- Login inválido (senha, usuário inexistente e campos vazios)
- Logout e reautenticação

#### 🛒 Checkout
- Fluxo completo de compra com dados gerados via Factory
- Validação de erros de formulário
- Validação de carrinho vazio
- Suporte a múltiplos produtos dinamicamente

---

### 🔹 Performance (K6)

- ✔️ Simulação de múltiplos usuários
- ✔️ Teste de carga em API pública
- ✔️ Identificação de comportamento sob estresse

- **Obs:**
Durante o teste de carga com 500 VUs simultâneos por 5 minutos, foram observadas degradações progressivas na taxa de sucesso e aumento da latência P95. Como a API utilizada é pública/mock, foram identificados indícios de rate limiting e instabilidade sob alta concorrência, caracterizando um possível gargalo externo da aplicação.

---

## ⚙️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Playwright
- Cucumber
- Zod
- Faker
- K6
- GitHub Actions
- Cucumber HTML Reporter

---

## ▶️ Como executar o projeto

### 1. Clonar repositório

```bash
git clone https://github.com/eaps123/qa-automation-fullstack
cd qa-automation-fullstack
```
### 2. Instalar dependências

```bash
npm install
```
---

### 3. Instalar browsers do Playwright

```bash
npx playwright install
```
---

## 🧪 Execução dos testes

### ✔️ Testes E2E

```bash
npm run test:e2e
```
---

### ✔️ Testes de API

```bash
npm run test:api
```
---

### ✔️ Testes de Performance (K6)

```bash
npm run test:performance
```
---

### ✔️ Gerar relatórios

```bash
npm run report
```
---

## 📊 Relatórios e evidências

Após a execução, os relatórios são gerados em:

/reports

Incluindo:

-   📊 Cucumber report
-   🔹 API report
-   ⚡ K6 report
-   📸 Screenshots automáticos por cenário
-   🎥 Vídeos de execução

---

## 🌐 Dashboard online

Acesse o dashboard completo com resultados:

https://eaps123.github.io/qa-automation-fullstack/

---

## ⚙️ CI/CD

Pipeline automatizado com **GitHub Actions**, responsável por:

1.  Testes de API
2.  Testes E2E
3.  Testes de performance (K6)
4.  Geração de relatórios
5.  Deploy automático no GitHub Pages

📍 Acesse na aba **Actions** do repositório

---

## 🎯 Diferenciais do projeto

-   🔁 Pipeline completo de QA
-   🧪 Testes API + E2E + Performance
-   📊 Testes de contrato com Zod
-   🧱 Arquitetura enterprise
-   📦 Separação de ambientes
-   📸 Evidências automáticas (screenshots e vídeos)
-   🔍 Código tipado com TypeScript
-   🥒 BDD com Cucumber
-   🧩 Uso de factories para geração de massa dinâmica
-   🚀 Deploy automático

---

## 🧠 Boas práticas aplicadas

* ✔️ Page Object Pattern
* ✔️ BDD com Cucumber
* ✔️ Factory Pattern
* ✔️ Service Layer Pattern
* ✔️ Separação de camadas (API / E2E / Performance)
* ✔️ Testes positivos e negativos
* ✔️ Schema Validation
* ✔️ Ambientes desacoplados
* ✔️ Reutilização de client HTTP
* ✔️ Código tipado
* ✔️ Evidências automáticas (screenshots)
* ✔️ Integração com CI/CD
* ✔️ Código tipado com TypeScript

## 🧩 Melhorias recentes aplicadas

- Refatoração de steps Cucumber para suporte a parâmetros dinâmicos
- Implementação de Factory Pattern no E2E (CheckoutFactory)
- Remoção parcial de hardcode em Page Objects (IDs dinâmicos)
- Centralização de dados de teste em config/data
- Separação de ambientes (dev/qa/prd) via config/env
- Criação de helpers reutilizáveis para infraestrutura de testes

---

## 📌 Considerações

O projeto foi estruturado visando:

* escalabilidade
* organização
* legibilidade
* manutenção simplificada
* arquitetura enterprise de QA

A aplicação web utilizada para os cenários E2E foi:

* SauceDemo

Durante evolução do projeto, algumas APIs públicas inicialmente utilizadas foram removidas devido a:

* instabilidade
* bloqueios em pipelines CI
* limitação de uso
* inconsistência de contratos

O projeto foi consolidado utilizando APIs mais estáveis para garantir maior confiabilidade dos testes automatizados.

---
## Autor
- Everton Alves Pedro
- QA Engineer | Automação de Testes
GitHub:
* https://github.com/eaps123