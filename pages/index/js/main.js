import { setupOffersAccordions } from "./accordion";
import { setupAddToCardButtons } from "./add-to-card";
import { setupOfferItemDescriptions } from "./expand-description";
import { setupFAQ } from "./faq";
import { setupHeaderCart } from "./header-cart";

document.addEventListener("DOMContentLoaded", () => {
  setupOffersAccordions();
  setupOfferItemDescriptions();
  setupFAQ();
  setupHeaderCart();
  setupAddToCardButtons();
});
