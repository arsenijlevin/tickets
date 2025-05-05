import { s as setupSharedJS } from "../shared/shared.js";
function setupAddToCardButtons() {
  const addToCartButtons = document.querySelectorAll(".btn-offer-to-cart");
  addToCartButtons.forEach((button) => {
    const parent = button.closest(".offer-item__to-cart");
    if (!parent) return;
    const cartControls = parent.querySelector(".cart-controls");
    if (!cartControls) return;
    const counter = cartControls.querySelector(".counter");
    const increaseButton = cartControls.querySelector(".btn-increase");
    const decreaseButton = cartControls.querySelector(".btn-decrease");
    button.addEventListener("click", function() {
      button.style.display = "none";
      cartControls.style.display = "flex";
    });
    increaseButton.addEventListener("click", function() {
      let currentCount = parseInt(counter.textContent, 10);
      if (currentCount < 999) {
        counter.textContent = currentCount + 1;
      }
    });
    decreaseButton.addEventListener("click", function() {
      let currentCount = parseInt(counter.textContent, 10);
      if (currentCount > 1) {
        counter.textContent = currentCount - 1;
      } else {
        cartControls.style.display = "none";
        button.style.display = "flex";
      }
    });
  });
}
function setupFAQ() {
  document.querySelectorAll(".faq-question").forEach((faq) => {
    const header = faq.querySelector(".faq-question__header");
    const toggleButton = faq.querySelector(".btn-faq-question-toggle");
    const answerContent = faq.querySelector(".faq-question__answer");
    header.addEventListener("click", () => {
      const isOpen = faq.classList.contains("open");
      if (isOpen) {
        closeAnswer(answerContent, toggleButton);
        faq.classList.remove("open");
      } else {
        openAnswer(answerContent, toggleButton);
        faq.classList.add("open");
      }
    });
  });
}
function openAnswer(content, button) {
  content.style.height = content.scrollHeight + "px";
  content.setAttribute("aria-hidden", "false");
  button.setAttribute("aria-expanded", "true");
}
function closeAnswer(content, button) {
  content.style.height = content.scrollHeight + "px";
  requestAnimationFrame(() => {
    content.style.height = "0";
  });
  content.setAttribute("aria-hidden", "true");
  button.setAttribute("aria-expanded", "false");
}
function setupHeaderCart() {
  document.addEventListener("scroll", function() {
    const header = document.querySelector(".main-header");
    const cart = document.querySelector(".cart-overlay");
    const headerPosition = header.getBoundingClientRect();
    if (headerPosition.top > 0) {
      cart.style.opacity = "0";
    } else {
      cart.style.opacity = "1";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  setupSharedJS();
  setupAddToCardButtons();
  setupHeaderCart();
  setupFAQ();
});
