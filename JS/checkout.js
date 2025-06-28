import {cart} from "./cart.js";
import { pdtList} from "../data.js";


function generateCartHtml() {
  return cart.map(item => {
    let cartHTML = '';
    const product = pdtList.find(p => item.id === p.id);
  
    if (!product) return '';

    const {id, title, price, pdtImgs} = product;
    return cartHTML += `
      <div class="cart-item-card" data-pdt-id=${id}>
        <div class="item-img">
          <img src=${pdtImgs[0]} alt="" loading="lazy">
        </div>
  
        <div class="item-info">
          <div>
            <div class="name-size">
              <h4 class="pdt-name">${title}</h4>
              <h5 class="pdt-size">
                size: <span class="size">${item.size}</span>
              </h5>
            </div>
            <div class="pdt-price">$${price.toFixed(2)}</div>
          </div>
  
          <div>
            <div class="quantity-control">
              <button class="increment">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="quantity">${item.quantity}</div>
              <button class="decrement">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <button class="remove-item-btn">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 7L7 17M7 7L17 17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `
  }).join("")
}

document.querySelector(".cart-not-empty")
  .innerHTML = generateCartHtml();



function cartItemsLength() {
  return cart.reduce((total, item) =>  total + item.quantity , 0)
}

document.querySelector(".cart-items-num")
  .innerHTML = cartItemsLength()

// increment - decrement btn event listener
const cartItemList = document.querySelectorAll(".cart-item-card");
const cartSubTotal = document.querySelector(".sub-total span");

cartSubTotal.textContent = updateCartSubtotal().toFixed(2);

cartItemList.forEach(cartItem => {
  cartItem.addEventListener("click", (e) => {
    const productId = cartItem.dataset.pdtId;
    const itemInCart = cart.find(i => i.id === productId)

    // check if !itemInCart
    //

    if (e.target.closest(".increment")) {
      itemInCart.quantity ++;
      localStorage.setItem("cart", JSON.stringify(cart));

      
      const cartItemQuantity = cartItem.querySelector(".quantity");
      const currentQuantity = Number(cartItemQuantity.textContent);
      cartItemQuantity.textContent = currentQuantity + 1;

      const totalCartQuantity = document.querySelector(".cart-items-num");
      const currentTotalQuantity = Number(totalCartQuantity.textContent);
      totalCartQuantity.textContent = currentTotalQuantity + 1

      cartSubTotal.textContent = updateCartSubtotal().toFixed(2);
    }  

    else if (e.target.closest(".decrement")) {
      if (itemInCart.quantity <= 1) {
      // Trigger remove logic instead
      return;}
      itemInCart.quantity --;
      localStorage.setItem("cart", JSON.stringify(cart));

      
      const cartItemQuantity = cartItem.querySelector(".quantity");
      const currentQuantity = Number(cartItemQuantity.textContent)
      cartItemQuantity.textContent = currentQuantity - 1;

      const totalCartQuantity = document.querySelector(".cart-items-num");
      const currentTotalQuantity = Number(totalCartQuantity.textContent);
      totalCartQuantity.textContent = currentTotalQuantity - 1;
      
      cartSubTotal.textContent = updateCartSubtotal().toFixed(2);
    }

    else if (e.target.closest(".remove-item-btn")) {
      const newCart = cart.filter(p => p.id !== productId);
      
      cart.length = 0;  // Clear the array
      newCart.forEach(item => cart.push(item));
      localStorage.setItem("cart", JSON.stringify(cart));
      
      document.querySelector(`.cart-item-card[data-pdt-id="${productId}"]`).remove();

      cartSubTotal.textContent = updateCartSubtotal().toFixed(2);
      document.querySelector(".cart-items-num")
        .innerHTML = cartItemsLength();
      console.log(newCart);
    }
  })
})


// remove item from cart
function removeItem() {}



// update cart subtotal
function updateCartSubtotal() {
  return cart.reduce((total , item) => {
    const p = pdtList.find(pdt => pdt.id === item.id);

    // check if !p
    //

    return p ? total + (item.quantity * p.price) : total
  }, 0);
}