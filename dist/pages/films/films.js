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
      toggleFAQ(faq, answerContent, toggleButton);
    });
  });
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target && target.classList.contains("faq-question")) {
      const answerContent = target.querySelector(".faq-question__answer");
      const toggleButton = target.querySelector(".btn-faq-question-toggle");
      openAnswer(answerContent, toggleButton);
      target.classList.add("open");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}
function toggleFAQ(faq, answerContent, toggleButton) {
  const isOpen = faq.classList.contains("open");
  if (isOpen) {
    closeAnswer(answerContent, toggleButton);
    faq.classList.remove("open");
  } else {
    openAnswer(answerContent, toggleButton);
    faq.classList.add("open");
  }
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
function openQuestionOnURLChange() {
  const hash = window.location.hash;
  const target = document.querySelector(hash);
  if (!target || !target.classList.contains("faq-question")) return;
  const answerContent = target.querySelector(".faq-question__answer");
  const toggleButton = target.querySelector(".btn-faq-question-toggle");
  openAnswer(answerContent, toggleButton);
  target.classList.add("open");
}
window.addEventListener("popstate", openQuestionOnURLChange);
document.addEventListener("DOMContentLoaded", () => {
  setupAddToCardButtons();
  setupFAQ();
});
