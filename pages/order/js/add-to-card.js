export function setupAddToCardButtons() {
  document.querySelectorAll(".cart-item__counter").forEach((counter) => {
    const decreaseBtn = counter.querySelector(".btn-decrease");
    const increaseBtn = counter.querySelector(".btn-increase");
    const counterDisplay = counter.querySelector(".cart-counter span");

    increaseBtn.addEventListener("click", () => {
      let current = parseInt(counterDisplay.textContent, 10);
      if (current < 999) {
        counterDisplay.textContent = current + 1;
      }
    });

    decreaseBtn.addEventListener("click", () => {
      let current = parseInt(counterDisplay.textContent, 10);
      if (current > 1) {
        counterDisplay.textContent = current - 1;
      }
    });
  });
}
