import {headerFunction} from "./header.js";
import {cart} from "./cart.js";
import {pdtList} from "../data.js";



// call header function
headerFunction();


document.addEventListener('DOMContentLoaded', initProductPage)

function initProductPage() {
  const productClickedId = localStorage.getItem("pdtClicked");
  const product = pdtList.find(p => p.id === productClickedId);
  
  const {title, price, sizeList, pdtImgs, description} = product;
  
  const productImgList = document.querySelector(".product-img-list");
  const sliderDots = document.querySelector(".dots");
  
  let imgGridHtml = "";
  let dotsHtml = "";
  pdtImgs.forEach((img, index) => {
    imgGridHtml += `
      <li class="img-container">
        <img src=${img} alt="" loading="lazy">
      </li>
    `
  
    dotsHtml += `<div data-dot-index="${index}"></div>`
  })
  
  productImgList.innerHTML = imgGridHtml;
  sliderDots.innerHTML = dotsHtml;
  
  // title & price
  document.querySelector(".product-title")
    .innerHTML = title;

  document.querySelector(".product-price")
    .innerHTML = `$${price.toFixed(2)}`;

  document.querySelector(".add-to-cart-btn .btn-price")
    .innerHTML = `$${price.toFixed(2)}`
  
  
  // slider code
  const dotsList = sliderDots.querySelectorAll("div");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  
  let currentSlide = 0;
  updateSlider()
  
  // next slide
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % pdtImgs.length;
    updateSlider();
  })
  
  // previous slide
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + pdtImgs.length) % pdtImgs.length;
    updateSlider();
  })
  
  // slide toggle dots
  dotsList.forEach((dot, index) => {
  
    dot.addEventListener("click", () => {
      dotsList.forEach(d => d.classList.remove("dot-active"));
      dot.classList.add("dot-active");
  
      currentSlide = index;
      updateSlider();
    })
  })
  
  // update slide function
  function updateSlider() {
    productImgList.style.transform = 
      `translateX(calc(-${currentSlide} * (100% + 16px))`;
  
    dotsList.forEach((dot, index) => {
      dot.classList.toggle("dot-active", index === currentSlide);
    });
  }
  
  
  // size list
  const sizeContainer = document.querySelector(".size-list");
  sizeList.forEach(s => {
    const size = document.createElement("li");
    size.innerHTML = s;
    sizeContainer.appendChild(size);
  
    size.addEventListener("click", () => {
      sizeContainer.querySelectorAll("li")
        .forEach(s => s.classList.remove("size-active"));
  
      size.classList.add("size-active");
      document.querySelector(".call-to-action").classList.add("size-selected");
    })
  });
  
  // description 
  document.querySelector(".dropdown p")
    .innerHTML = description;
  
  document.querySelectorAll(".dropdown")
    .forEach(drop => {
  
      drop.addEventListener("click", () => {
        drop.classList.toggle("close-dropdown");
      })
    })
  
  // add to cart button
  document.querySelector(".add-to-cart-btn")
    .addEventListener("click", () => {
      const productInCart = cart.find(x => x.id === productClickedId);
  
      const selectedSize = [...sizeContainer.querySelectorAll("li")]
        .find(s => s.classList.contains("size-active"))

      if (!productInCart) {
        cart.push({
          id: productClickedId,
          quantity: 1,
          size: selectedSize.textContent
        })
      } else {
        productInCart.quantity += 1
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart)
    })
}