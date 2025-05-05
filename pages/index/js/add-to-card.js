export function setupAddToCardButtons() {
  // Select all add-to-cart buttons
  const addToCartButtons = document.querySelectorAll(".btn-offer-to-cart");

  addToCartButtons.forEach((button) => {
    // Get the parent offer-item__to-cart div for each button
    const parent = button.closest(".offer-item__to-cart");
    if (!parent) return;
    const cartControls = parent.querySelector(".cart-controls");
    if (!cartControls) return;
    const counter = cartControls.querySelector(".counter");
    const increaseButton = cartControls.querySelector(".btn-increase");
    const decreaseButton = cartControls.querySelector(".btn-decrease");

    // When the "в корзину" button is clicked
    button.addEventListener("click", function () {
      button.style.display = "none"; // Hide the "в корзину" button
      cartControls.style.display = "flex"; // Show the cart controls
    });

    // When the "+" button is clicked
    increaseButton.addEventListener("click", function () {
      let currentCount = parseInt(counter.textContent, 10);
      if (currentCount < 999) {
        counter.textContent = currentCount + 1;
      }
    });

    // When the "-" button is clicked
    decreaseButton.addEventListener("click", function () {
      let currentCount = parseInt(counter.textContent, 10);

      if (currentCount > 1) {
        counter.textContent = currentCount - 1;
      } else {
        // Reset back to the "в корзину" button when the counter reaches 0 or less
        cartControls.style.display = "none";
        button.style.display = "flex";
      }
    });
  });
}
