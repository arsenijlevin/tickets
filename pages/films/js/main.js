// import { setupSharedJS } from "../../shared/js/shared";
import { setupAddToCardButtons } from "./add-to-card";
import { setupFAQ } from "./faq";
// import { setupHeaderCart } from "./header-cart";

document.addEventListener("DOMContentLoaded", () => {
  // setupSharedJS();

  setupAddToCardButtons();
  // setupHeaderCart();
  setupFAQ();
});
