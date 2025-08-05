document.addEventListener('DOMContentLoaded', () => {
    const estoque = [];
    const visualizador = document.getElementById('visualizador-imagem');

    // Carrega imagem do produto selecionado
    document.getElementById('seletor-produto').addEventListener('change', function() {
        visualizador.innerHTML = '';
        
        if (this.value) {
            const img = document.createElement('img');
            img.src = `img/${this.value}.png`;
            img.alt = `Imagem de ${this.value}`;
            img.onerror = () => {
                visualizador.innerHTML = '📦';
                console.error(`Imagem não encontrada: img/${this.value}.png`);
            };
            visualizador.appendChild(img);
        }
    });

    // Registrar ENTRADA
    document.getElementById('btn-entrada').addEventListener('click', () => {
        const produto = document.getElementById('seletor-produto').value;
        const quantidade = parseFloat(document.getElementById('quantidade-entrada').value);
        const preco = parseFloat(document.getElementById('preco-entrada').value);

        if (!produto || isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco <= 0) {
            alert('Preencha todos os campos da ENTRADA corretamente!');
            return;
        }

        const index = estoque.findIndex(item => item.nome === produto);

        if (index !== -1) {
            // Atualiza produto existente
            estoque[index].quantidade += quantidade;
            estoque[index].preco = preco; // Atualiza preço
        } else {
            // Adiciona novo produto
            estoque.push({
                nome: produto,
                quantidade: quantidade,
                preco: preco
            });
        }

        atualizarEstoque();
        limparCampos('entrada');
    });

    // Registrar SAÍDA
    document.getElementById('btn-saida').addEventListener('click', () => {
        const produto = document.getElementById('seletor-produto').value;
        const quantidade = parseFloat(document.getElementById('quantidade-saida').value);

        if (!produto || isNaN(quantidade) || quantidade <= 0) {
            alert('Preencha todos os campos da SAÍDA corretamente!');
            return;
        }

        const index = estoque.findIndex(item => item.nome === produto);

        if (index === -1) {
            alert('Produto não encontrado no estoque!');
            return;
        }

        if (estoque[index].quantidade < quantidade) {
            alert('Quantidade insuficiente em estoque!');
            return;
        }

        estoque[index].quantidade -= quantidade;
        
        if (estoque[index].quantidade === 0) {
            estoque.splice(index, 1); // Remove se zerar
        }

        atualizarEstoque();
        limparCampos('saida');
    });

    // Atualiza a exibição do estoque
    function atualizarEstoque() {
        const lista = document.getElementById('lista-estoque');
        let total = 0;

        lista.innerHTML = '';

        estoque.forEach(item => {
            const valorItem = item.quantidade * item.preco;
            total += valorItem;

            lista.innerHTML += `
                <div class="item-estoque">
                    <img src="img/${item.nome}.png" alt="${item.nome}" onerror="this.src='img/sem-foto.png'">
                    <div class="info-produto">
                        <h3>${formatarNome(item.nome)}</h3>
                        <div class="detalhes">
                            <span>${item.quantidade} kg</span>
                            <span>R$ ${item.preco.toFixed(2)}/kg</span>
                            <span>Total: R$ ${valorItem.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById('valor-total').textContent = total.toFixed(2);
    }

    function limparCampos(tipo) {
        if (tipo === 'entrada') {
            document.getElementById('quantidade-entrada').value = '';
            document.getElementById('preco-entrada').value = '';
        } else {
            document.getElementById('quantidade-saida').value = '';
        }
    }

    function formatarNome(nome) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }
});