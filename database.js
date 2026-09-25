// importa o modulo para trabaçhar com os arquivos
const fs = require('fs');

// impora o módulo para montar caminhos.
const path = require('path');

// define o caminho completo até o arquivo de banco de dados.
const database = path.join(__dirname, "data", "produtos.json");

// função que grava o conteudo no json
function gravarProdutos(produtos) {

    //converter os dados para o formato de json (texto)
    const conteudo = JSON.stringify(produtos, null, 2);

    // gravar o texto no arquivo (sobrescreve o anterior)
    fs.writeFileSync(database, conteudo, "utf-8");
}

// função que lê o conteudo do json
function lerProdutos() {

    // le o conteudo do JSON como texto
    const conteudo = fs.readFileSync(database, "utf-8");

    // retorna o conteudo como um vetor de objetos de JS
    return JSON.parse(conteudo);
}

// exporta as duas funções para uso externo
module.exports = { gravarProdutos, lerProdutos }