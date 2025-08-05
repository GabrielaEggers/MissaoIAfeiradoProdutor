document.addEventListener('DOMContentLoaded', () => {
    const estoque = [];
    const imgProduto = document.getElementById('img-produto'); // Imagem principal

    // ATUALIZA ESTOQUE (cálculo corrigido)
    function atualizarEstoque() {
        const lista = document.getElementById('lista-produtos');
        let total = 0;
        
        lista.innerHTML = ''; // Limpa a lista

        estoque.forEach(produto => {
            const valorItem = produto.quantidade * produto.preco;
            total += valorItem;

            lista.innerHTML += `
                <div class="produto-item">
                    <img src="img/${produto.nome}.jpg" alt="${produto.nome}" 
                         onerror="this.src='img/sem-foto.jpg'">
                    <div>
                        <h3>${produto.nome.toUpperCase()}</h3>
                        <p>${produto.quantidade}kg × R$${produto.preco.toFixed(2)} = 
                        <strong>R$${valorItem.toFixed(2)}</strong></p>
                    </div>
                </div>
            `;
        });

        document.getElementById('valor-total').textContent = total.toFixed(2);
    }

    // MOSTRA IMAGEM (100% funcional)
    document.getElementById('seletor').addEventListener('change', function() {
        if (this.value) {
            imgProduto.src = `img/${this.value}.jpg`;
            imgProduto.style.display = 'block';
            imgProduto.onerror = () => {
                imgProduto.style.display = 'none';
                document.getElementById('visualizador').innerHTML = '🛒';
            };
        } else {
            imgProduto.style.display = 'none';
        }
    });

    // BOTÃO ADICIONAR (cálculo garantido)
    document.getElementById('botao-adicionar').addEventListener('click', () => {
        const nome = document.getElementById('seletor').value;
        const qtd = parseFloat(document.getElementById('quantidade').value);
        const preco = parseFloat(document.getElementById('preco').value);

        if (nome && qtd > 0 && preco > 0) {
            const index = estoque.findIndex(item => item.nome === nome);
            
            if (index >= 0) {
                estoque[index] = { nome, quantidade: qtd, preco }; // Atualiza
            } else {
                estoque.push({ nome, quantidade: qtd, preco }); // Adiciona novo
            }

            atualizarEstoque();
        } else {
            alert("Preencha todos os campos corretamente!");
        }
    });
});