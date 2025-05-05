const debugStickyButtons = false;

export function setupAddToCartStickyButton() {
  const showButtonHeight = 700;
  const offerItems = document.querySelectorAll(".offer-item");

  let stickyButton = null;
  let activeItem = null;

  // Debugging elements (for panel and visibility check)
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
      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        parseFloat(style.opacity) === 0 ||
        current.offsetHeight === 0
      ) {
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

    stickyButton.addEventListener("click", () => originalBtn.click());

    document.body.appendChild(stickyButton);
  }

  function removeStickyButton() {
    if (stickyButton) {
      stickyButton.classList.add("fade-out");

      setTimeout(() => {
        if (stickyButton) {
          stickyButton.remove();
          stickyButton = null;
        }
      }, 300); // match the CSS transition duration
    }
  }

  function updateStickyLogic() {
    let stickyShown = false;
    let debugText = "";

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

      if (debugStickyButtons) {
        debugText += `#${index + 1}: tall=${descriptionTooTall}, inZone=${itemInZone}, btnVisible=${buttonVisible}, visible=${isVisibleDeep(item)}\n`;
      }
    });

    if (!stickyShown) {
      removeStickyButton();
      activeItem = null;
    }

    if (debugStickyButtons) {
      debugPanel.textContent = debugText;
    }
  }

  // Periodic fallback check
  setInterval(() => {
    requestAnimationFrame(updateStickyLogic);
  }, 500);

  // Initial run
  updateStickyLogic();
}
