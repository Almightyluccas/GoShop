const displayCart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('#cartContainer');

  cartContainer.innerHTML = '';

  cartItems.forEach((item, index) => {
    const { image, imageAlt, title, price, quantity } = item;

    const cartItemHTML = `
      <hr class="my-4">
      <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img src="${image}" class="img-fluid rounded-3" alt="${imageAlt}">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6 class="text-muted">${title}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 class="mb-0"> ${price}</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <a href="#!" class="text-muted" onclick="removeCartItem(${index})"><i class="fas fa-times"></i></a>
        </div>
      </div>
    `;
    cartContainer.innerHTML += cartItemHTML;
  });
};

const getTotalProductCount = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  return cartItems.length;
};
const getTotalPrice = () => {
  const cartItemsJSON = localStorage.getItem('cart');
  const cartItems = cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const priceWithoutSymbols = item.price.replace('$', '').replace(',', '');
    const priceWithoutDollarSign = parseFloat(priceWithoutSymbols);
    totalPrice += priceWithoutDollarSign;
  }

  return totalPrice;
};
const updateTotalPrice = () => {
  const totalPrice = getTotalPrice();
  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.innerHTML = '';

  const priceText = document.createTextNode('$' + totalPrice);
  totalPriceElement.appendChild(priceText);
};
const updateTotalItems = () => {
  const cartItemsJSON = localStorage.getItem('cart');
  const cartItems = cartItemsJSON ? JSON.parse(cartItemsJSON) : [];

  const totalItemsElement = document.querySelector('#totalItems');
  const totalItemsElem = document.querySelector('#totalItems2') ;
  if (totalItemsElement) {
    totalItemsElement.textContent = cartItems.length;
    totalItemsElem.textContent = cartItems.length ;
  }
};
const updateTotalPriceAfterTax = () => {
  const cartItemsJSON = localStorage.getItem('cart');
  const cartItems = cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  let totalPrice = 0;
  const totalPriceAfterTax = getTotalPrice() * 1.08;

  const totalPriceAfterTaxElement = document.querySelector('#totalPriceAfterTax');
  if (totalPriceAfterTaxElement) {
    totalPriceAfterTaxElement.textContent = '$' + totalPriceAfterTax.toFixed(2);
  }
};
const registerButton = document.querySelector('#purchaseButton');
registerButton.addEventListener('click', () => {
  alert('Successful purchase!');
  setTimeout(() => {
    localStorage.removeItem('cart');
    window.location.href = '../html/index.html';
  }, 1000);
});
const removeCartItem = (index) => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  displayCart();
  updateTotalPrice();
  updateTotalItems();
  updateTotalPriceAfterTax();
};

displayCart();
updateTotalPrice();
updateTotalItems();
updateTotalPriceAfterTax();