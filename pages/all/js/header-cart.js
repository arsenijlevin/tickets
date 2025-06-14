export function setupHeaderCart() {
  document.addEventListener("scroll", function () {
    const header = document.querySelector("[data-main-header]");
    const cart = document.querySelector(".cart-overlay");
    // Get the position of the header relative to the viewport
    const headerPosition = header.getBoundingClientRect();
    // Check if the header is fully visible (top of the header is within the viewport)
    if (headerPosition.top > 0) {
      // Hide the button if the header is visible
      cart.style.opacity = "0";
      cart.style.zIndex = "-1";
    } else {
      // Show the button if the header is not visible
      cart.style.opacity = "1";
      cart.style.zIndex = "10";
    }
  });
}
