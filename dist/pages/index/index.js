function setupOffersAccordions() {
  const offers = document.querySelectorAll(".offer");
  offers.forEach(setupOfferAccordion);
}
function setupOfferAccordion(offer) {
  const header = offer.querySelector(".offer__header");
  const content = offer.querySelector(".offer__content");
  const toggleButton = offer.querySelector(".btn__offer-toggle");
  header.addEventListener("click", (event) => {
    if (event.target.closest(".btn__offer-toggle")) {
      event.preventDefault();
    }
    if (offer.dataset.transitioning === "true") return;
    const isOpen = offer.classList.contains("open");
    if (isOpen) {
      closeAccordion(offer, content, toggleButton);
    } else {
      openAccordion(offer, content, toggleButton);
    }
  });
}
function openAccordion(offer, content, toggleButton) {
  offer.dataset.transitioning = "true";
  content.style.height = content.scrollHeight + "px";
  const onTransitionEnd = () => {
    content.style.height = "auto";
    content.removeEventListener("transitionend", onTransitionEnd);
    delete offer.dataset.transitioning;
  };
  content.addEventListener("transitionend", onTransitionEnd);
  offer.classList.add("open");
  toggleButton.setAttribute("aria-expanded", "true");
  content.setAttribute("aria-hidden", "false");
}
function closeAccordion(offer, content, toggleButton) {
  offer.dataset.transitioning = "true";
  content.style.height = content.scrollHeight + "px";
  requestAnimationFrame(() => {
    content.style.height = "0";
  });
  const onTransitionEnd = () => {
    content.removeEventListener("transitionend", onTransitionEnd);
    delete offer.dataset.transitioning;
  };
  content.addEventListener("transitionend", onTransitionEnd);
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
function setupAddToCartStickyButton() {
  const showButtonHeight = 700;
  const offerItems = document.querySelectorAll(".offer-item");
  let stickyButton = null;
  let activeItem = null;
  const debugLine = document.createElement("div");
  debugLine.id = "sticky-debug-line";
  document.body.appendChild(debugLine);
  const debugPanel = document.createElement("div");
  debugPanel.id = "sticky-debug-panel";
  document.body.appendChild(debugPanel);
  function isElementVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= window.innerHeight;
  }
  function isInTargetZone(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= showButtonHeight && rect.bottom >= showButtonHeight;
  }
  function isVisibleDeep(el) {
    let current = el;
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) === 0 || current.offsetHeight === 0) {
        return false;
      }
      current = current.parentElement;
    }
    return true;
  }
  function showStickyButton(originalBtn) {
    removeStickyButton();
    stickyButton = originalBtn.cloneNode(true);
    stickyButton.classList.add("sticky-cart-button");
    stickyButton.addEventListener("click", (event) => {
      event.preventDefault();
      originalBtn.scrollIntoView({
        behavior: "smooth",
        block: "center"
        // Align the button in the center of the viewport
      });
      setTimeout(() => {
        originalBtn.click();
      }, 500);
    });
    document.body.appendChild(stickyButton);
  }
  function removeStickyButton() {
    if (stickyButton) {
      stickyButton.classList.add("fade-out");
      setTimeout(
        (stickyButton2) => {
          if (stickyButton2) {
            stickyButton2.remove();
            stickyButton2 = null;
          }
        },
        300,
        stickyButton
      );
    }
  }
  function updateStickyLogic() {
    let stickyShown = false;
    offerItems.forEach((item, index) => {
      item.classList.remove("debug-active");
      if (!isVisibleDeep(item)) return;
      const fullDesc = item.querySelector(".offer-item__full-description");
      const originalBtn = item.querySelector(".btn-offer-to-cart");
      if (!fullDesc || !originalBtn) return;
      const descriptionTooTall = fullDesc.scrollHeight > 100;
      const buttonVisible = isElementVisible(originalBtn);
      const itemInZone = isInTargetZone(item);
      if (itemInZone && descriptionTooTall && !buttonVisible) {
        item.classList.add("debug-active");
        if (activeItem !== item) {
          showStickyButton(originalBtn);
          activeItem = item;
        }
        stickyShown = true;
      }
    });
    if (!stickyShown) {
      removeStickyButton();
      activeItem = null;
    }
  }
  setInterval(() => {
    requestAnimationFrame(updateStickyLogic);
  }, 500);
  updateStickyLogic();
}
function setupOfferItemDescriptions() {
  const offerItems = document.querySelectorAll(".offer-item");
  offerItems.forEach((item) => {
    const toggleButton = item.querySelector(".btn-offer-item__show-full-description");
    const fullDescription = item.querySelector(".offer-item__full-description");
    if (!toggleButton || !fullDescription) return;
    const descriptionHeight = fullDescription.scrollHeight;
    const isMobile = window.innerWidth < 768;
    if (descriptionHeight <= 200) {
      toggleButton.style.display = "none";
      fullDescription.style.height = "auto";
      fullDescription.setAttribute("aria-hidden", "false");
      item.classList.add("description-open");
      return;
    }
    if (!isMobile) {
      fullDescription.setAttribute("aria-hidden", "false");
      toggleButton.setAttribute("aria-expanded", "true");
      item.classList.add("description-open");
      toggleButton.textContent = "скрыть";
      fullDescription.style.height = descriptionHeight + "px";
    } else {
      fullDescription.setAttribute("aria-hidden", "true");
      toggleButton.setAttribute("aria-expanded", "false");
      fullDescription.style.height = "200px";
    }
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
document.addEventListener("DOMContentLoaded", () => {
  setupOffersAccordions();
  setupOfferItemDescriptions();
  setupFAQ();
  setupAddToCardButtons();
  setupAddToCartStickyButton();
});
