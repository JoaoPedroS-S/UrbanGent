// Função para adicionar um item aos favoritos
function addToFavorites(id, name, imageUrl, price) {
    // Obtém a lista de favoritos do localStorage (ou cria uma lista vazia se não existir)
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Verifica se o item já está na lista
    const isAlreadyFavorite = favorites.some(favorite => favorite.id === id);

    if (!isAlreadyFavorite) {
        // Adiciona o novo item aos favoritos
        favorites.push({ id, name, imageUrl, price });
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
        alert(`${name} já está nos seus favoritos.`);
    }
}

// Função para remover um item dos favoritos
function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favorite => favorite.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
}

// Função para exibir a lista de favoritos
function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Você não tem nenhum favorito ainda.</p>';
    } else {
        favoritesContainer.innerHTML = favorites.map(favorite => `
            <div class="product-card">
                <img src="${favorite.imageUrl}" alt="${favorite.name}">
                <h2>${favorite.name}</h2>
                <p>R$ ${favorite.price.toFixed(2)}</p>
                <button onclick="removeFromFavorites(${favorite.id})">Remover dos Favoritos</button>
            </div>
        `).join('');
    }
}


        // Função para adicionar um item ao carrinho
        function addToCart(id, name, imageUrl, price) {
            // Recupera o carrinho do localStorage ou cria uma lista vazia
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log("Estado inicial do carrinho:", cart);
            
            // Verifica se o item já está no carrinho
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                // Se já estiver, incrementa a quantidade
                existingItem.quantity++;
                console.log(`Item já existe no carrinho. Quantidade atualizada:`, existingItem);
            } else {
                // Caso contrário, adiciona o novo item
                const newItem = { id, name, imageUrl, price, quantity: 1 };
                cart.push(newItem);
                console.log("Novo item adicionado ao carrinho:", newItem);
            }
            
            // Atualiza o localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log("Estado atualizado do carrinho:", cart);
        }


        // Função para remover um item do carrinho
        function removeFromCart(id) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Atualiza a lista exibida
            showCart();
        }

        // Função para exibir os itens do carrinho
        function showCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartContainer = document.getElementById('cart-container');
            const totalPriceElement = document.getElementById('total');
            let total = 0;

            if (cart.length === 0) {
                cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
                totalPriceElement.innerText = '0.00';
            } else {
                cartContainer.innerHTML = cart.map(item => {
                    total += item.price * item.quantity; // Calcula o total
                    return `
                        <div class="product-card">
                            <img src="${item.imageUrl}" alt="${item.name}">
                            <h2>${item.name}</h2>
                            <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                            <button onclick="removeFromCart(${item.id})">Remover</button>
                        </div>
                    `;
                }).join('');
                
                totalPriceElement.innerText = total.toFixed(2); // Exibe o total
            }
        }

        // Função de exemplo para finalizar a compra (pode ser melhorada)
        document.getElementById('checkout-button').onclick = function() {
            alert('Finalizando a compra!');
            // Aqui você pode adicionar mais lógica para o processo de checkout
        };

        // Chama a função para exibir os itens do carrinho ao carregar a página
        window.onload = showCart;