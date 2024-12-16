document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    let cart = [];

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <h3>${product.title}</h3>
                    <img src="${product.image}" alt="${product.title}" width="100">
                    <p class="price">${product.price} USD only!</p>
                    <button onclick="viewDetails(${product.id})">View Details</button>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        });

    window.viewDetails = (id) => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('modal-image').src = product.image;
                document.getElementById('modal-title').textContent = product.title;
                document.getElementById('modal-description').textContent = product.description;
                document.getElementById('modal-price').textContent = `${product.price} USD only!`;
                document.getElementById('modal').style.display = 'block';
            });
    };
        
    // 获取模态框元素
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
        
    // 当用户点击关闭按钮时，隐藏模态框
    closeModal.onclick = () => {
        modal.style.display = 'none';
    };
        
    // 当用户点击模态框外部时，隐藏模态框
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    window.addToCart = (id) => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(product => {
                cart.push(product);
                updateCart();
            });
    };

    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
    
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `${item.title}<br><span class="price">${item.price} USD</span>`;
            
            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remove';
            removeButton.onclick = () => removeFromCart(index);
            
            cartItem.appendChild(removeButton);
            cartItems.appendChild(cartItem);
    
            totalPrice += item.price;
        });
    
        const totalPriceElement = document.createElement('div');
        totalPriceElement.innerHTML = `<span class="totalprice"> Total Price: ${totalPrice.toFixed(2)} USD <br>`;
        cartItems.appendChild(totalPriceElement);
    }
    
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }
    
    document.getElementById('checkoutButton').addEventListener('click', checkout);
    function checkout() {
        const cartData = {
            items: cart,
            totalPrice: cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
        };
        localStorage.setItem('cartData', JSON.stringify(cartData));
        window.location.href = 'check.html';
    }
});