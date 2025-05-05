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
export {
  setupSharedJS as s
};
