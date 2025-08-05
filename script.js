document.addEventListener('DOMContentLoaded', () => {
    const estoque = [];
    const visualizador = document.getElementById('visualizador-img');

    // Atualiza o estoque na tela
    function atualizarEstoque() {
        const lista = document.getElementById('lista-estoque');
        let total = 0;

        lista.innerHTML = '';

        estoque.forEach(produto => {
            const valor = produto.quantidade * produto.preco;
            total += valor;

            lista.innerHTML += `
                <div class="item-estoque">
                    <img src="img/${produto.nome}.png" alt="${produto.nome}" onerror="this.onerror=null; this.src='img/sem-foto.png'">
                    <div>
                        <h3>${produto.nome.toUpperCase()}</h3>
                        <p>${produto.quantidade} kg × R$ ${produto.preco.toFixed(2)} = R$ ${valor.toFixed(2)}</p>
                    </div>
                </div>
            `;
        });

        document.getElementById('valor-total').textContent = total.toFixed(2);
    }

    // Mostra imagem ao selecionar produto
    document.getElementById('seletor').addEventListener('change', function() {
        visualizador.innerHTML = '';
        
        if (this.value) {
            const img = document.createElement('img');
            img.src = `img/${this.value}.png`;
            img.alt = this.value;
            img.onerror = () => visualizador.innerHTML = '📦';
            visualizador.appendChild(img);
        }
    });

    // Registrar ENTRADA
    document.getElementById('btn-entrada').addEventListener('click', () => {
        const produto = document.getElementById('seletor').value;
        const quantidade = parseFloat(document.getElementById('qtd-entrada').value);
        const preco = parseFloat(document.getElementById('preco').value);

        if (!produto || isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco <= 0) {
            alert('Preencha todos os campos da ENTRADA corretamente!');
            return;
        }

        const index = estoque.findIndex(item => item.nome === produto);

        if (index !== -1) {
            estoque[index].quantidade += quantidade;
            estoque[index].preco = preco; // Atualiza preço
        } else {
            estoque.push({
                nome: produto,
                quantidade: quantidade,
                preco: preco
            });
        }

        atualizarEstoque();
        document.getElementById('qtd-entrada').value = '';
        document.getElementById('preco').value = '';
    });

    // Registrar SAÍDA
    document.getElementById('btn-saida').addEventListener('click', () => {
        const produto = document.getElementById('seletor').value;
        const quantidade = parseFloat(document.getElementById('qtd-saida').value);

        if (!produto || isNaN(quantidade) || quantidade <= 0) {
            alert('Preencha a quantidade da SAÍDA corretamente!');
            return;
        }

        const index = estoque.findIndex(item => item.nome === produto);

        if (index === -1) {
            alert('Produto não encontrado no estoque!');
            return;
        }

        if (estoque[index].quantidade < quantidade) {
            alert('Estoque insuficiente!');
            return;
        }

        estoque[index].quantidade -= quantidade;
        
        if (estoque[index].quantidade <= 0) {
            estoque.splice(index, 1); // Remove se zerar
        }

        atualizarEstoque();
        document.getElementById('qtd-saida').value = '';
    });
});