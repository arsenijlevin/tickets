export function setupOffersAccordions() {
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

    // Prevent action if transition is ongoing
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

  // Force reflow to ensure transition triggers
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
