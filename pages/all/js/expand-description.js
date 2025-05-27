export function setupOfferItemDescriptions() {
  const offerItems = document.querySelectorAll(".offer-item");

  offerItems.forEach((item) => {
    const toggleButton = item.querySelector(".btn-offer-item__show-full-description");
    const fullDescription = item.querySelector(".offer-item__full-description");

    if (!toggleButton || !fullDescription) return;

    const descriptionHeight = fullDescription.scrollHeight;

    const isMobile = window.innerWidth < 768;

    if (descriptionHeight <= 200) {
      // Small description — no need for toggle
      toggleButton.style.display = "none";
      fullDescription.style.height = "auto"; // Always fully open
      fullDescription.setAttribute("aria-hidden", "false");
      item.classList.add("description-open"); // Add class to indicate open state
      return;
    }

    if (!isMobile) {
      // Always fully open on page load in desktop
      fullDescription.setAttribute("aria-hidden", "false");
      toggleButton.setAttribute("aria-expanded", "true");

      item.classList.add("description-open");
      toggleButton.textContent = "скрыть";

      fullDescription.style.height = descriptionHeight + "px";
    } else {
      // Big description — need toggle
      fullDescription.setAttribute("aria-hidden", "true");
      toggleButton.setAttribute("aria-expanded", "false");

      // Show part of the content (e.g., 200px) initially
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
    fullDescription.style.height = "200px"; // Reset height to part of the content
  });

  item.classList.remove("description-open");
  toggleButton.textContent = "показать больше";
  toggleButton.setAttribute("aria-expanded", "false");
  fullDescription.setAttribute("aria-hidden", "true");
}
