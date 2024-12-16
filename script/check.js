document.addEventListener('DOMContentLoaded', () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    const checkoutItems = document.getElementById('checkoutItems');
    const totalPrice = document.getElementById('totalPrice');

    cartData.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.title}<br><span class="price">${item.price} USD</span>`;
        checkoutItems.appendChild(listItem);
    });

    totalPrice.innerHTML = `Total Price: ${cartData.totalPrice} USD`;
    
    document.getElementById('buying').addEventListener('click', () => {
        alert('Thank you for buying! Your order has been placed. Reference Number: HHS00001');
    });
});