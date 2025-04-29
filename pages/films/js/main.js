import { setupAddToCardButtons } from "./add-to-card";
import { setupFAQ } from "./faq";
import { setupHeaderCart } from "./header-cart";

document.addEventListener("DOMContentLoaded", () => {
  setupAddToCardButtons();
  setupHeaderCart();
  setupFAQ();
});
