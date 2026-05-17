// =========================
// CHILDRENSMART JAVASCRIPT
// =========================

// Select all Add to Cart buttons
const cartButtons = document.querySelectorAll('.product-card button');

// Loop through each button
cartButtons.forEach(button => {

    button.addEventListener('click', () => {

        alert('Item added to cart successfully!');

    });

});