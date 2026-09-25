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

// cria a rota que exibe todos os produtos
app.get('/produtos', (req, res) => {
  
  // le os produtos já gravados no JSON
  let produtos = lerProdutos();

  // retorna os produtos do JSON
  res.json(produtos);
});

// cria a rota que exibe um produto específico
app.get('/produtos/:id', (req, res) => {

  // le os produtos já gravados no JSON
  let produtos = lerProdutos();
  
  // recupera o id do produto
  let id = Number(req.params.id);

  // le os produtos já gravados no JSON
  let produto = produtos.find((item) => item.id == id);

  // verifica se não existe produto com o id solicitado
  if (!produto) {
    res.status(404).json({erro: "Produto não encontrado!"});
    return;
  }

  // retorna o produto com o id especificado
  res.json(produto);
});

// cria a rota que atualiza um produto
app.put('/produtos/:id', (req, res) => {
  
  // le os produtos já gravados no JSON
  let produtos = lerProdutos();

  // recupera o id do produto
  let id = Number(req.params.id);

  // procura na lista de produtos se o indice do que sera alterado.
  let indice = produtos.findIndex((item) => item.id ==+ id);

  // verifica se o produto foi encontrado
  if (indice == -1) {
    return res.status(404).json({erro: "Produto não encontrado!"});
  }

  // pega os novos dados enviados na requisição
  let { nome, preco, quantidade } = req.body;

  // atualiza os dados do produto
  produtos[indice] = {
    id,
    nome: nome ?? produtos[indice].nome,
    preco: preco ?? produtos[indice].preco,
    quantidade: quantidade ?? produtos[indice].quantidade
  };

  // grava os dados atualizaods na lista de produtos
  gravarProdutos(produtos);

  // retorna o produto atualizado
  res.json(produtos[indice]);
});

// cria a rota que exclui um produto
app.delete('/produtos/:id', (req, res) => {
  
  // le os produtos já gravados no JSON
  let produtos = lerProdutos();

  // recupera o id do produto
  let id = Number(req.params.id);

  // procura na lista de produtos se o indice do que sera alterado.
  let indice = produtos.findIndex((item) => item.id === id);

  // verifica se o produto foi encontrado
  if (indice === -1) {
    return res.status(404).json({erro: "Produto não encontrado!"});
  }

  //remove o produto da lsita de produtos
  let [produtoRemovido] = produtos.splice(indice, 1);

  // retorna o produto excluido
  res.status(201).json({ Sucesso: "Produto excluido com sucesso!" });
});

// coloca o servidor da web no ar
app.listen(porta, () => {
  console.log(`Servidor web do Supermercado iniciado em http://localhost:${porta}`);
});
