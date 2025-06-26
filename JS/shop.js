import {headerFunction} from "./header.js";
import {pdtList} from "../data.js";
import { cart } from "./cart.js";



// header function call
headerFunction()

// Categories 
const categoryList = [...document.querySelectorAll(".category-btn")];
const productList = document.querySelector(".product-list");

categoryList.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryList.forEach(b => b.classList.remove("category-btn-active"));

    btn.classList.add("category-btn-active");
    const categoryBtnId = btn.dataset.categoryId;

    //filterPdtList(categoryBtnId)
    filterGrid(categoryBtnId);
  })
})


// filter products
function filterGrid(categoryBtnId) {
  let filteredProducts; 

  if (categoryBtnId === "all") {
    filteredProducts = pdtList;
  } else {
    filteredProducts = pdtList.filter(pdt => pdt.category === categoryBtnId)
  }

  // generate filtered pdts
  generateHtml(filteredProducts)

  cardInit()
}

// generate product grid
function generateHtml(list) {
  let pdtGridHTML = '';
  list.map(pdt => {
    const {id, title, price, pdtImgs} = pdt;
    return pdtGridHTML += `
      <div class="product-card" data-pdt-id="${id}">
        <div class="product-img">
          <img src="${pdtImgs[0]}" alt="" loading="lazy">
        </div>
        <div class="product-info">
          <h3>${title}</h3>
          <h3>$${price.toFixed(2)}</h3>
        </div>
        <button class="add-cart-btn">
          QUICK ADD
          <span class="add-icon">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </button>
      </div>
    `;
  });
  productList.innerHTML = pdtGridHTML;
}
generateHtml(pdtList)




// card - add to cart on click
function cardInit() {
  
  const pdtGrid = [...document.querySelectorAll(".product-card")];
  pdtGrid.forEach(card => {

    // mouse over
    card.addEventListener("mouseover", () => {
      const pdtId = card.dataset.pdtId;
      const product = pdtList.find(x => x.id === pdtId);

      card.querySelector(".product-img img").src = product.pdtImgs[1];
    })

    card.addEventListener("mouseout", () => {
      const pdtId = card.dataset.pdtId;
      const product = pdtList.find(x => x.id === pdtId);

      card.querySelector(".product-img img").src = product.pdtImgs[0];
    })


    card.addEventListener('click', (e) => {

      // add product to cart
      if (e.target.classList.contains("add-cart-btn")) {
        const productId = card.dataset.pdtId;
        const productInCart = cart.find(x => x.id === productId);

        if (!productInCart) {
          cart.push({
            id: productId,
            quantity: 1,
            size: "S"
          })
        } else {
          productInCart.quantity += 1
        }

        // save cart to local storage
        try {
          localStorage.setItem("cart", JSON.stringify(cart));
        } catch (error) {
          console.error("Failed to save cart:", error);
        }
        console.log(cart)

      // go to product page
      } else {
        const productCardId = card.dataset.pdtId;
        localStorage.setItem("pdtClicked", productCardId);

        window.location.href = "../HTML/product-page.html";
        console.log(productCardId);
      }
    })
  })
}

cardInit()