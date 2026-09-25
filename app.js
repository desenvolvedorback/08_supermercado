// importa o express (framework da web)
const express = require('express');

// importa as funções para manipular banco de dados
const { gravarProdutos, lerProdutos } = require('./database');

// cria aplicação da web
const app = express();

//define a porta onde o servidor da web vai funcionar
const porta = 3000;

// permite que o expresse entenda request de http
app.use(express.json());

// define a rota principal da web
app.get('/', (req, res) => {
  res.send('Bem vindo ao Supermercado');
});


// cria a rota de gravação de produtos
app.post('/produtos', (req, res) => {
  
  // le os produtos já gravados no banco de dados
  let produtos = lerProdutos();

  // recupera os daods enviados para cadastro pelo frontend
  let { nome, preco, quantidade } = req.body;

  // verifica se todos os dados foram informados
  if (!nome || !preco == undefined || !quantidade == undefined) {
    res.status(400).json({erro: "Os campos são obrigatórios!"});
    return; 
  }

  // calcula o id do proximo produto
  let proximoID = produtos.length > 0 ? Math.max(...produtos.map((item) => item.id)) +1 : 1;

  // cria um novo produto
  let novoProduto = {
    id: proximoID,
    nome,
    preco,
    quantidade
  };

  // adiciona o novo produto a lista de produtos
  produtos.push(novoProduto);

  // grava os produtos no json
  gravarProdutos(produtos);

  // informa que o produto foi cadastrado com sucesso
  res.status(201).json({sucesso: "Produto cadastrado com sucesso!"});
});

// coloca o servidor da web no ar
app.listen(porta, () => {
  console.log(`Servidor web do Supermercado iniciado em http://localhost:${porta}`);
});