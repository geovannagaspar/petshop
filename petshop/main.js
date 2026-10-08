let itens = [];

const formulario = document.getElementById("formulario");

const produto = document.getElementById("produto");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("preco");

const desconto = document.getElementById("desconto");

const lista = document.getElementById("lista");

const subtotal = document.getElementById("subtotal");
const valorDesconto = document.getElementById("valorDesconto");
const total = document.getElementById("total");

const botaoLimpar = document.getElementById("limpar");


// ADICIONAR ITEM
formulario.addEventListener("submit", function(e) {

    // Impede a página de recarregar
    e.preventDefault();

    let nome = produto.value;
    let qtd = Number(quantidade.value);
    let valor = Number(preco.value);

    if (nome === "") {
        alert("Digite o produto ou serviço.");
        return;
    }

    if (qtd <= 0) {
        alert("Digite uma quantidade válida.");
        return;
    }

    if (valor <= 0) {
        alert("Digite um preço válido.");
        return;
    }

    let item = {
        nome: nome,
        quantidade: qtd,
        preco: valor
    };

    itens.push(item);

    atualizarPagina();

    formulario.reset();

    quantidade.value = 1;
});


// ATUALIZAR A TABELA
function atualizarPagina() {

    lista.innerHTML = "";

    for (let i = 0; i < itens.length; i++) {

        let valorTotal =
            itens[i].quantidade * itens[i].preco;

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${itens[i].nome}</td>

            <td>${itens[i].quantidade}</td>

            <td>
                R$ ${itens[i].preco.toFixed(2)}
            </td>

            <td>
                R$ ${valorTotal.toFixed(2)}
            </td>

            <td>
                <button 
                    type="button"
                    class="remover"
                    data-id="${i}">
                    Remover
                </button>
            </td>
        `;

        lista.appendChild(linha);
    }

    calcularTotal();
}


// CALCULAR TOTAL
function calcularTotal() {

    let soma = 0;

    for (let i = 0; i < itens.length; i++) {

        soma +=
            itens[i].quantidade * itens[i].preco;
    }

    let porcentagem = Number(desconto.value);

    let valorDoDesconto =
        soma * (porcentagem / 100);

    let valorFinal =
        soma - valorDoDesconto;

    subtotal.textContent =
        soma.toFixed(2);

    valorDesconto.textContent =
        valorDoDesconto.toFixed(2);

    total.textContent =
        valorFinal.toFixed(2);
}


// ATUALIZAR DESCONTO
desconto.addEventListener("input", function() {

    calcularTotal();

});


// REMOVER ITEM
lista.addEventListener("click", function(e) {

    if (e.target.classList.contains("remover")) {

        let indice =
            e.target.getAttribute("data-id");

        itens.splice(indice, 1);

        atualizarPagina();
    }

});


// LIMPAR
botaoLimpar.addEventListener("click", function() {

    itens = [];

    desconto.value = 0;

    atualizarPagina();

});