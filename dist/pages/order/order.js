function setupMobileHeaderMenu() {
  const menuButton = document.querySelector(".btn__mobile-menu");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeButton = document.getElementById("closeMobileMenu");
  function openMenu() {
    mobileMenu.classList.add("open");
    menuOverlay.classList.add("visible");
  }
  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuOverlay.classList.remove("visible");
  }
  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
}
function setupSharedJS() {
  setupMobileHeaderMenu();
}
function setupAddToCardButtons() {
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
document.addEventListener("DOMContentLoaded", () => {
  setupSharedJS();
  setupAddToCardButtons();
});
