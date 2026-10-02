# 🛒 Supermercado API REST

Uma API RESTful simples e funcional para o gerenciamento de produtos de um supermercado, desenvolvida em **Node.js** com **Express** utilizando um arquivo **JSON** para persistência de dados.

---

## 📌 Visão Geral

Este projeto permite realizar as operações básicas de **CRUD** (Create, Read, Update, Delete) em um catálogo de produtos. É ideal para estudos de desenvolvimento backend com JavaScript, manipulação do sistema de arquivos (`fs`) e criação de endpoints com Express.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no backend.
- **Express**: Framework web mínimo e flexível para rotas e requisições HTTP.
- **Node `fs` & `path`**: Módulos nativos para manipulação do sistema de arquivos e caminhos.
- **JSON**: Formato leve utilizado como armazenamento/banco de dados estático.

---

## 📁 Estrutura do Projeto

```text
.
├── data/
│   └── produtos.json    # Arquivo JSON que atua como banco de dados
├── app.js               # Servidor Express e definição das rotas
├── database.js          # Funções utilitárias para leitura e gravação no JSON
└── package.json         # Dependências e scripts do projeto
```

---

## 🚀 Instalação e Execução

### Pré-requisitos
- **Node.js** instalado em sua máquina (versão 14 ou superior recomendada).

### Passo a Passo

1. **Clone o repositório ou baixe os arquivos do projeto:**
   ```bash
   git clone https://github.com/desenvolvedorback/08_supermercado.git
   cd 08_supermercado
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   node app.js
   ```

4. **Acesse a API:**
   O servidor estará rodando em: `http://localhost:3000`

---

## 🔗 Rotas da API

### Base URL: `http://localhost:3000`

---

### 1. Boas-vindas
* **GET** `/`
* **Descrição:** Rota principal de verificação do status da API.
* **Resposta (200 OK):**
  ```text
  Bem vindo ao Supermercado
  ```

---

### 2. Listar todos os produtos
* **GET** `/produtos`
* **Descrição:** Retorna a lista completa de produtos cadastrados.
* **Resposta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "nome": "Arroz 5kg",
      "preco": 24.9,
      "quantidade": 40
    },
    {
      "id": 2,
      "nome": "Feijão 1kg",
      "preco": 8.5,
      "quantidade": 30
    }
  ]
  ```

---

### 3. Buscar produto por ID
* **GET** `/produtos/:id`
* **Descrição:** Retorna os detalhes de um único produto com base no ID fornecido na URL.
* **Resposta (200 OK):**
  ```json
  {
    "id": 1,
    "nome": "Arroz 5kg",
    "preco": 24.9,
    "quantidade": 40
  }
  ```
* **Resposta de Erro (404 Not Found):**
  ```json
  {
    "erro": "Produto não encontrado!"
  }
  ```

---

### 4. Cadastrar produto
* **POST** `/produtos`
* **Descrição:** Adiciona um novo produto ao catálogo. O ID é gerado automaticamente.
* **Corpo da Requisição (JSON):**
  ```json
  {
    "nome": "Café 500g",
    "preco": 16.50,
    "quantidade": 25
  }
  ```
* **Resposta (201 Created):**
  ```json
  {
    "sucesso": "Produto cadastrado com sucesso!"
  }
  ```
* **Resposta de Erro (400 Bad Request):**
  ```json
  {
    "erro": "Os campos são obrigatórios!"
  }
  ```

---

### 5. Atualizar produto
* **PUT** `/produtos/:id`
* **Descrição:** Atualiza os dados de um produto existente pelo seu ID.
* **Corpo da Requisição (JSON - Envie apenas os campos que deseja alterar):**
  ```json
  {
    "preco": 26.90,
    "quantidade": 35
  }
  ```
* **Resposta (200 OK):**
  ```json
  {
    "id": 1,
    "nome": "Arroz 5kg",
    "preco": 26.9,
    "quantidade": 35
  }
  ```
* **Resposta de Erro (404 Not Found):**
  ```json
  {
    "erro": "Produto não encontrado!"
  }
  ```

---

### 6. Excluir produto
* **DELETE** `/produtos/:id`
* **Descrição:** Remove um produto do catálogo pelo seu ID.
* **Resposta (201 Created):**
  ```json
  {
    "Sucesso": "Produto excluido com sucesso!"
  }
  ```
* **Resposta de Erro (404 Not Found):**
  ```json
  {
    "erro": "Produto não encontrado!"
  }
  ```

---

## 📝 Licença

Este projeto é destina-se a fins educacionais e didáticos.
