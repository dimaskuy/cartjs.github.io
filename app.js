if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

const tbody = document.querySelector('.cart-wrap table tbody');

function ready() {
  const removeItem = Array.from(document.querySelectorAll('.remove-item'));

  // Remove Item
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
      tbody.removeChild(e.target.parentElement.parentElement);
      updateCartTotal();
    }
  });

  // Input Quantity Rules
  const quantityItem = Array.from(document.querySelectorAll('table tr td input.quantity'));


  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('quantity')) {
      quantityChange(e);
    }
  });

  // Add To Cart
  const addToCartBtn = Array.from(document.querySelectorAll('.card .add-cart'));
  addToCartBtn.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      addToCartClicked(e);
    });
  });
}

function addToCartClicked(e) {
  const cardItem = e.target.parentElement.parentElement;
  const itemTitle = cardItem.querySelector('.item-title').textContent;
  const itemImg = cardItem.querySelector('.card-img-top').src;
  const itemPrice = cardItem.querySelector('.card-body .item-price').textContent.replace('Rp', '').replace(',00', '');
  addItemToCard(itemTitle, itemPrice, itemImg);
  updateCartTotal();
}

function addItemToCard(title, price, img) {
  const cartItemName = Array.from(tbody.querySelectorAll('.item-name'));
    for (let i = 0; i < cartItemName.length; i++) {
      const item = cartItemName[i];
      if (item.textContent === title) {
        // alert('This item is already added to the cart.');
        const parentInput = item.parentElement.nextElementSibling.nextElementSibling;
        let thisInputValue = parseFloat(parentInput.querySelector('input').value);
        const changeValue = thisInputValue += 1;
        parentInput.querySelector('input').value = changeValue;
        return;
      }
    }

  const tableRow = document.createElement('tr');
    tableRow.classList.add('border-bottom');
  const cartContent = `
    <td><img src="${img}" alt="${title}"> <span class="item-name px-1">${title}</span></td>
    <td class="price d-block mt-2">Rp <span>${price.replace('Rp', '')}</span></td>
    <td><input type="number" value="1" class="quantity px-2"></td>
    <td><button type="button" class="btn btn-danger remove-item">REMOVE</button></td>
  `;
  tableRow.innerHTML = cartContent;
  tbody.appendChild(tableRow);
}


function quantityChange(e) {
  const input = e.target;
  if (isNaN(input.value) === true || input.value <= 0 === true) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  const trCart = Array.from(tbody.querySelectorAll('tr'));
  let total = 0;
  trCart.forEach(tr => {
    const priceItem = tr.querySelector('td.price span');
    const quantityItem = tr.querySelector('td input.quantity').value;
    const price = parseFloat(priceItem.textContent.replace('.','').replace(',',''));
    total += (price * quantityItem);
  });

  // total = Math.round(total * 100) / 100;

  document.querySelector('.cart-total .cart-total-result').textContent = total.toLocaleString('id');
}

document.querySelector('.btn-purchase').addEventListener('click', function() {
  const tbodyChild = Array.from(tbody.children);
  if (tbodyChild.length !== 0) {
    const confirmPurchase = confirm('Are you sure purchase this item(s)?');
    if (confirmPurchase) {
      alert('Thanks for purchase!');
      tbodyChild.forEach(child => {
        tbody.removeChild(child);
      });
    }
    else { return; }
  } else {
    alert('Your cart still empty.');
  }
  updateCartTotal();
});





/* METHOD UNTUK MENGKONVERSI RIBUAN DENGAN SATUAN TITIK */
// function thousandSeparator(str) {
//   let string = str + "";
//   const regex = /(-?\d+)(\d{3})/g;
//
//   while (regex.test(string)) {
//       string = string.replace(regex, '$1' + '.' + '$2');
//     }
//     return string;
//   }
//   console.log(thousandSeparator(4300000));
//
//   console.log((4300000).toLocaleString('id'));
