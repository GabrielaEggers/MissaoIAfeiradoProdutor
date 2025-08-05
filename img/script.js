document.addEventListener('DOMContentLoaded', () => {
    const estoque = [];
    const seletor = document.getElementById('seletor');
    const visualizador = document.getElementById('visualizador');
    const quantidade = document.getElementById('quantidade');
    const preco = document.getElementById('preco');
    const botaoAdicionar = document.getElementById('botao-adicionar');
    const listaProdutos = document.getElementById('lista-produtos');
    const valorTotal = document.getElementById('valor-total');

    // Carrega imagem do produto selecionado
    seletor.addEventListener('change', () => {
        visualizador.innerHTML = '';
        
        if (seletor.value) {
            const img = document.createElement('img');
            img.src = `img/${seletor.value}.png`;
            img.alt = `Imagem de ${seletor.value}`;
            img.onerror = () => {
                visualizador.innerHTML = '🖼️';
                console.error(`Imagem não encontrada: img/${seletor.value}.png`);
            };
            visualizador.appendChild(img);
        }
    });

    // Adiciona/atualiza produto
    botaoAdicionar.addEventListener('click', () => {
        const nome = seletor.value;
        const qtd = parseFloat(quantidade.value);
        const valor = parseFloat(preco.value);

        if (!nome || isNaN(qtd) || qtd <= 0 || isNaN(valor) || valor <= 0) {
            alert('Preencha todos os campos com valores válidos!');
            return;
        }

        const indice = estoque.findIndex(item => item.nome === nome);

        if (indice !== -1) {
            estoque[indice] = { nome, quantidade: qtd, preco: valor };
        } else {
            estoque.push({ nome, quantidade: qtd, preco: valor });
        }

        atualizarEstoque();
        limparFormulario();
    });

    function atualizarEstoque() {
        listaProdutos.innerHTML = '';
        let total = 0;

        estoque.forEach(produto => {
            const subtotal = produto.quantidade * produto.preco;
            total += subtotal;

            const item = document.createElement('div');
            item.className = 'produto-item';
            item.innerHTML = `
                <img src="img/${produto.nome}.png" alt="${produto.nome}" onerror="this.parentNode.innerHTML = '📦'">
                <div class="info-produto">
                    <h3>${formatarNome(produto.nome)}</h3>
                    <div class="detalhes-produto">
                        <span>${produto.quantidade} kg</span>
                        <span>R$ ${produto.preco.toFixed(2)}/kg</span>
                        <span>R$ ${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            `;
            listaProdutos.appendChild(item);
        });

        valorTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    function limparFormulario() {
        seletor.value = '';
        quantidade.value = '';
        preco.value = '';
        visualizador.innerHTML = '';
    }

    function formatarNome(nome) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }
});