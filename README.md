# 🧪 QA Automation Challenge

Projeto de automação de testes cobrindo **API, E2E e testes de carga**, com foco em boas práticas, organização e simulação de um ambiente real de QA.

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
│   └── tests/
│
├── e2e/                  # Testes End-to-End (BDD)
│   ├── features/
│   ├── steps/
│   └── pages/
│
├── performance/          # Testes de carga (K6)
│   └── load-test.js
│
├── reports/              # Relatórios gerados
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

#### 🛒 Checkout

* ✔️ Fluxo completo de compra
* ✔️ Validação de erros em formulário

---

### 🔹 Performance (K6)

* ✔️ Simulação de múltiplos usuários
* ✔️ Teste de carga em API pública
* ✔️ Identificação de comportamento sob estresse

---

## ⚙️ Tecnologias Utilizadas

* Playwright (API + E2E)
* Cucumber (BDD)
* K6 (Performance)
* TypeScript
* GitHub Actions (CI/CD)
* Cucumber HTML Reporter

---

## ▶️ Como Executar

### 📦 Instalar dependências

```bash
npm install
```
---

### 🧪 Rodar testes de API + E2E

```bash
npx playwright test
```
ou (BDD completo):
```bash
npm run test:e2e
```
---

### 📊 Gerar relatório HTML

```bash
npm run report
```
---

### 🚀 Executar fluxo completo

```bash
npm run test:full
```
---

### ⚡ Executar teste de carga

```bash
k6 run performance/load-test.js
```
---

## 📊 Relatórios

Os relatórios são gerados automaticamente após a execução:

```bash
reports/cucumber-report.html
```

### ✔️ O que o relatório inclui:

* Status dos cenários
* Steps detalhados
* Screenshots em falhas

---

## ⚙️ CI/CD

Pipeline configurado com **GitHub Actions**, responsável por:

* Executar testes automaticamente a cada push
* Gerar relatório HTML
* Disponibilizar artefatos para download

📍 Acesse na aba **Actions** do repositório
![CI](https://github.com/eaps123/qa-automation-fullstack/actions/workflows/ci.yml/badge.svg)

---

## 📸 Exemplo de execução

![report](./reports/exemplo.png)

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

---
## Autor
Everton Alves Pedro
QA Engineer | Automação de Testes