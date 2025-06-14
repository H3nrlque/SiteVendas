document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Bolsa de Couro Marrom', price: 250.00, image: 'imagens/Foto1.png', size: 'media', category: 'Couro' },
        { id: 2, name: 'Bolsa Pequena', price: 320.50, image: 'imagens/Foto2.png', size: 'grande', category: 'Festa' },
        { id: 3, name: 'Bolsa Pequena Branca', price: 150.00, image: 'imagens/foto3.png', size: 'pequena', category: 'Casual' },
        { id: 4, name: 'Bolsa de Ombro Caramelo', price: 280.00, image: 'imagens/foto4.png', size: 'media', category: 'Couro' },
        { id: 5, name: 'Bolsa Prata', price: 180.75, image: 'imagens/foto5.png', size: 'grande', category: 'Festa' },
        { id: 6, name: 'Bolsa Pequena Transversal', price: 99.90, image: 'imagens/foto6.png', size: 'pequena', category: 'Casual' },
        { id: 7, name: 'Bolsa de Praia Colorida', price: 120.00, image: 'imagens/foto7.png', size: 'grande', category: 'Praia' },
        { id: 8, name: 'Bolsa de Viagem Grande', price: 450.00, image: 'imagens/foto8.png', size: 'grande', category: 'Viagem' },
        { id: 9, name: 'Bolsa de Festa Pequena', price: 200.00, image: 'imagens/foto9.png', size: 'pequena', category: 'Festa' },
        { id: 10, name: 'Bolsa de Média', price: 300.00, image: 'imagens/foto10.png', size: 'media', category: 'Casual' },
        { id: 11, name: 'Bolsa de Couro Preta', price: 270.00, image: 'imagens/foto11.png', size: 'media', category: 'Couro' },
        { id: 12, name: 'Bolsa de Couro Marrom', price: 290.00, image: 'imagens/foto12.png', size: 'media', category: 'Couro' },
        { id: 13, name: 'Bolsa de Marrom', price: 310.00, image: 'imagens/foto13.png', size: 'media', category: 'Casual' },
        { id: 14, name: 'Bolsa de Branca', price: 330.00, image: 'imagens/foto14.png', size: 'media', category: 'Casual' }
    ];

    let cart = [];
    const productList = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceEl = document.getElementById('total-price');
    const productsSection = document.getElementById('products-section');
    const cartSection = document.getElementById('cart-section');
    const loginSection = document.getElementById('login-section');
    const homeLink = document.getElementById('home-link');
    const cartLink = document.getElementById('cart-link');
    const loginLink = document.getElementById('login-link');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const sizeFilter = document.getElementById('size-filter');
    const showSection = (sectionToShow) => {
        [productsSection, cartSection, loginSection].forEach(section => {
            section.classList.add('hidden');
        });
        sectionToShow.classList.remove('hidden');
    };
    const renderProducts = (filteredProducts = products) => {
        productList.innerHTML = '';
        if (filteredProducts.length === 0) {
            productList.innerHTML = '<p>Nenhum produto encontrado com os filtros selecionados.</p>';
            return;
        }
        filteredProducts.forEach(product => {
            productList.innerHTML += `
              <div class="product-card">
                <div class="product-card__image-wrapper">
                  <img class="product-card__image" src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-card__content">
                  <span class="product-card__category">${product.category || 'Novidade'}</span> 
                  <h3 class="product-card__title">${product.name}</h3>
                  <p class="product-card__price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                  <button class="product-card__button add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
                </div>
              </div>
            `;
        });
    };
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
        alert(`${product.name} foi adicionado ao carrinho!`);
    };
    const removeFromCart = (productId) => {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    };
    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <span>${item.name}</span>
                        <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="remove-from-cart-btn" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceEl.textContent = totalPrice.toFixed(2).replace('.', ',');
        cartCount.textContent = cart.length;
    };
    
    const applyFilters = () => {
        const maxPrice = parseFloat(priceFilter.value);
        const selectedSize = sizeFilter.value;
        priceValue.textContent = maxPrice.toFixed(2);
        const filtered = products.filter(product => {
            const priceMatch = product.price <= maxPrice;
            const sizeMatch = selectedSize === 'todos' || product.size === selectedSize;
            return priceMatch && sizeMatch;
        });
        renderProducts(filtered);
    };

    homeLink.addEventListener('click', (e) => { e.preventDefault(); showSection(productsSection); });
    cartLink.addEventListener('click', (e) => { e.preventDefault(); showSection(cartSection); });
    loginLink.addEventListener('click', (e) => { e.preventDefault(); showSection(loginSection); });

    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });
    
    priceFilter.addEventListener('input', applyFilters);
    sizeFilter.addEventListener('change', applyFilters);
    document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem('subtotal', totalPrice);
    
    window.location.href = 'pagamento.html';
});
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });
    
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login realizado com sucesso! (Simulação)');
        showSection(productsSection);
    });

    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cadastro realizado com sucesso! (Simulação)');
        showSection(productsSection);
    });
    renderProducts();
    updateCart();
});