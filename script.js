document.addEventListener('DOMContentLoaded', () => {
    const estoque = [];
    const visualizador = document.getElementById('visualizador-img');

    // 1. MOSTRAR IMAGEM AO SELECIONAR
    document.getElementById('seletor-produto').addEventListener('change', function() {
        visualizador.innerHTML = '';
        
        if (this.value) {
            const img = document.createElement('img');
            img.src = `https://gabrielaeggers.github.io/MissaoIAfeiradoProdutor/img/${this.value}.jpg`;
            img.alt = this.value;
            img.onerror = () => {
                visualizador.innerHTML = '📦';
                console.log(`Imagem ${this.value}.jpg não encontrada`);
            };
            visualizador.appendChild(img);
        }
    });

    // 2. REGISTRAR ENTRADA
    document.getElementById('btn-entrada').addEventListener('click', () => {
        const produto = document.getElementById('seletor-produto').value;
        const quantidade = parseFloat(document.getElementById('qtd-entrada').value);
        const preco = parseFloat(document.getElementById('preco').value);

        if (!produto || isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco <= 0) {
            alert('Preencha todos os campos da ENTRADA corretamente!');
            return;
        }

        const index = estoque.findIndex(item => item.nome === produto);

        if (index !== -1) {
            estoque[index].quantidade += quantidade;
            estoque[index].preco = preco;
        } else {
            estoque.push({ nome: produto, quantidade, preco });
        }

        atualizarEstoque();
        document.getElementById('qtd-entrada').value = '';
        document.getElementById('preco').value = '';
    });

    // 3. REGISTRAR SAÍDA
    document.getElementById('btn-saida').addEventListener('click', () => {
        const produto = document.getElementById('seletor-produto').value;
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
            estoque.splice(index, 1);
        }

        atualizarEstoque();
        document.getElementById('qtd-saida').value = '';
    });

    // FUNÇÃO PARA ATUALIZAR A TELA
    function atualizarEstoque() {
        const lista = document.getElementById('lista-estoque');
        let total = 0;

        lista.innerHTML = '';

        estoque.forEach(produto => {
            const valorItem = produto.quantidade * produto.preco;
            total += valorItem;

            lista.innerHTML += `
                <div class="item-estoque">
                    <img src="https://gabrielaeggers.github.io/MissaoIAfeiradoProdutor/img/${produto.nome}.jpg" 
                         alt="${produto.nome}"
                         onerror="this.src='https://via.placeholder.com/50?text=Sem+Imagem'">
                    <div class="info">
                        <h3>${produto.nome.toUpperCase()}</h3>
                        <p>${produto.quantidade} kg × R$ ${produto.preco.toFixed(2)} = R$ ${valorItem.toFixed(2)}</p>
                    </div>
                </div>
            `;
        });

        document.getElementById('valor-total').textContent = total.toFixed(2);
    }
});