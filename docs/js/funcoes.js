// Função para adicionar um item aos favoritos
function addToFavorites(id, name, imageUrl, price) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(favorite => favorite.id === id);

    if (!isAlreadyFavorite) {
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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = { id, name, imageUrl, price, quantity: 1 };
        cart.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para remover um item do carrinho
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
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
            total += item.price * item.quantity;
            return `
                <div class="product-card">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            `;
        }).join('');
        totalPriceElement.innerText = total.toFixed(2);
    }
}

// Função de checkout melhorada
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPriceElement = document.getElementById('total');
    const total = parseFloat(totalPriceElement.innerText);

    if (cart.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
        return;
    }

    // Exibe um resumo da compra para confirmação
    const confirmation = confirm(`
        Você está prestes a finalizar a compra com os seguintes itens:

        ${cart.map(item => `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}

        Total: R$ ${total.toFixed(2)}

        Deseja continuar?
    `);

    if (!confirmation) {
        return; // Cancela a operação se o usuário não confirmar
    }

    // Simula o processo de pagamento
    alert('Pagamento sendo processado...');
    
    // Simulação de sucesso
    setTimeout(() => {
        alert('Compra finalizada com sucesso! Obrigado pela sua compra.');
        localStorage.removeItem('cart'); // Limpa o carrinho
        showCart(); // Atualiza a interface
    }, 1000); // Simula o tempo de processamento
}

// Exibe o carrinho ao carregar a página
window.onload = showCart;
