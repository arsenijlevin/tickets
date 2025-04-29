function setupOffersAccordions() {
  const offers = document.querySelectorAll(".offer");
  offers.forEach(setupOfferAccordion);
}
function setupOfferAccordion(offer) {
  const header = offer.querySelector(".offer__header");
  const content = offer.querySelector(".offer__content");
  const toggleButton = offer.querySelector(".btn__offer-toggle");
  content.setAttribute("aria-hidden", "true");
  header.addEventListener("click", (event) => {
    if (event.target.closest(".btn__offer-toggle")) {
      event.preventDefault();
    }
    const isOpen = offer.classList.contains("open");
    if (isOpen) {
      closeAccordion(offer, content, toggleButton);
    } else {
      openAccordion(offer, content, toggleButton);
    }
  });
}
function openAccordion(offer, content, toggleButton) {
  content.style.height = content.scrollHeight + "px";
  const onTransitionEnd = () => {
    content.style.height = "auto";
    content.removeEventListener("transitionend", onTransitionEnd);
  };
  content.addEventListener("transitionend", onTransitionEnd);
  offer.classList.add("open");
  toggleButton.setAttribute("aria-expanded", "true");
  content.setAttribute("aria-hidden", "false");
}
function closeAccordion(offer, content, toggleButton) {
  content.style.height = content.scrollHeight + "px";
  requestAnimationFrame(() => {
    content.style.height = "0";
  });
  offer.classList.remove("open");
  toggleButton.setAttribute("aria-expanded", "false");
  content.setAttribute("aria-hidden", "true");
}
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
function setupOfferItemDescriptions() {
  const offerItems = document.querySelectorAll(".offer-item");
  offerItems.forEach((item) => {
    const toggleButton = item.querySelector(".btn-offer-item__show-full-description");
    const fullDescription = item.querySelector(".offer-item__full-description");
    if (!toggleButton || !fullDescription) return;
    const descriptionHeight = fullDescription.scrollHeight;
    if (descriptionHeight <= 200) {
      toggleButton.style.display = "none";
      fullDescription.style.height = "auto";
      fullDescription.setAttribute("aria-hidden", "false");
      item.classList.add("description-open");
      return;
    }
    fullDescription.setAttribute("aria-hidden", "true");
    toggleButton.setAttribute("aria-expanded", "false");
    fullDescription.style.height = "200px";
    toggleButton.addEventListener("click", () => {
      const isOpen = item.classList.contains("description-open");
      if (isOpen) {
        closeDescription(item, fullDescription, toggleButton);
      } else {
        openDescription(item, fullDescription, toggleButton);
      }
    });
  });
}
function openDescription(item, fullDescription, toggleButton) {
  fullDescription.style.height = fullDescription.scrollHeight + "px";
  item.classList.add("description-open");
  toggleButton.textContent = "скрыть";
  toggleButton.setAttribute("aria-expanded", "true");
  fullDescription.setAttribute("aria-hidden", "false");
}
function closeDescription(item, fullDescription, toggleButton) {
  fullDescription.style.height = fullDescription.scrollHeight + "px";
  requestAnimationFrame(() => {
    fullDescription.style.height = "200px";
  });
  item.classList.remove("description-open");
  toggleButton.textContent = "показать больше";
  toggleButton.setAttribute("aria-expanded", "false");
  fullDescription.setAttribute("aria-hidden", "true");
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
  setupOffersAccordions();
  setupOfferItemDescriptions();
  setupFAQ();
  setupHeaderCart();
  setupAddToCardButtons();
});
