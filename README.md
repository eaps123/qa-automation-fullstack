## 📊 Status do Projeto

![CI](https://github.com/eaps123/qa-automation-fullstack/actions/workflows/ci.yml/badge.svg)

---

# 🧪 QA Automation Challenge

Projeto de automação de testes cobrindo **API, E2E e testes de carga**, com foco em boas práticas, organização e simulação de um ambiente real de QA.

---

## 📌 Objetivo

Demonstrar habilidades em QA Automation com foco em:

-   Testes E2E com Playwright + Cucumber
-   Testes de API
-   Testes de performance com K6
-   Integração contínua (GitHub Actions)
-   Geração de relatórios e evidências (screenshots e vídeos)

---

## 📖 Descrição

Este projeto foi desenvolvido para validar diferentes camadas de uma aplicação, utilizando múltiplas APIs públicas para garantir **cobertura ampla e cenários realistas**.

A estratégia adotada separa responsabilidades por tipo de teste:

### 🔹 APIs utilizadas

* **Fake Store API**
  Utilizada para cenários de **CRUD completo** (GET, POST, PUT, DELETE)

* **ReqRes**
  Utilizada para:

  * autenticação
  * cenários negativos (ex: login inválido)

* **BrasilAPI**
  Utilizada para:

  * validação de dados reais (ex: consulta de CEP)

---

## 🏗️ Estrutura do Projeto

```bash
qa-automation-fullstack/
├── api/                  # Testes de API
│   ├── factories/
│   ├── services/
│   └── tests/
│
├── e2e/                  # Testes End-to-End (BDD)
│   ├── features/
│   ├── pages/
│   ├── steps/
│   └── support/
│
├── performance/          # Testes de carga (K6)
│   └── load-test.js
│
├── reports/              # Relatórios gerados
│   ├── screenshots/
│   └── videos/
│
├── scripts/              # Script utilizados para o reports
│
├── .github/workflows/    # CI/CD (GitHub Actions)
│
├── package.json
└── README.md
```
---

## 🧪 Cobertura de Testes

### 🔹 API

* ✔️ Validação de status codes
* ✔️ Validação de response body
* ✔️ Cenários positivos e negativos
* ✔️ Testes de autenticação
* ✔️ Testes com dados reais

---

### 🔹 E2E (BDD com Cucumber)

#### 🔐 Login

* ✔️ Login com sucesso
* ✔️ Login inválido
* ✔️ Login após logout

#### 🛒 Checkout

* ✔️ Fluxo completo de compra
* ✔️ Checkout com dados inválidos
* ✔️ Usuário não logado acessando checkout
* ✔️ Carrinho vazio

---

### 🔹 Performance (K6)

* ✔️ Simulação de múltiplos usuários
* ✔️ Teste de carga em API pública
* ✔️ Identificação de comportamento sob estresse

---

## ⚙️ Tecnologias Utilizadas

-   Node.js
-   TypeScript
-   Playwright
-   Cucumber (BDD)
-   K6 (Performance)
-   GitHub Actions (CI/CD)
-   Cucumber HTML Reporter

---

## ▶️ Como executar o projeto

### 1. Clonar repositório

git clone https://github.com/eaps123/qa-automation-fullstack cd
qa-automation-fullstack

---

### 2. Instalar dependências

npm install

---

### 3. Instalar browsers do Playwright

npx playwright install

---

## 🧪 Execução dos testes

### ✔️ Testes E2E

npm run test:e2e

---

### ✔️ Testes de API

npm run test:api

---

### ✔️ Testes de Performance (K6)

npm run test:performance

---

### ✔️ Gerar relatórios

npm run report

---

## 📊 Relatórios e evidências

Após a execução, os relatórios são gerados em:

/reports

Incluindo:

-   📊 Cucumber report
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

-   🔁 Pipeline completo (E2E + API + Performance)
-   📊 Dashboard customizado com métricas
-   📸 Evidências automáticas (screenshots e vídeos)
-   🧪 BDD com Cucumber
-   ⚡ Testes de performance integrados
-   🚀 Deploy automático

---

## 🧠 Boas práticas aplicadas

* ✔️ Page Object Pattern
* ✔️ BDD com Cucumber
* ✔️ Separação de camadas (API / E2E / Performance)
* ✔️ Testes positivos e negativos
* ✔️ Evidências automáticas (screenshots)
* ✔️ Integração com CI/CD
* ✔️ Código tipado com TypeScript

---

## 📌 Considerações

O projeto foi estruturado com foco em:

* escalabilidade
* legibilidade
* organização
* simulação de cenário real de automação

E o projeto utiliza a aplicação pública de testes:

https://www.saucedemo.com/

---
## Autor
Everton Alves Pedro
QA Engineer | Automação de Testes