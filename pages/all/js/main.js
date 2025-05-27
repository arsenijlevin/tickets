import { setupOffersAccordions } from "./accordion";
import { setupAddToCardButtons } from "./add-to-card";
import { setupAddToCartStickyButton } from "./add-to-cart-sticky-button";
import { setupOfferItemDescriptions } from "./expand-description";
import { setupFAQ } from "./faq";

document.addEventListener("DOMContentLoaded", () => {
  setupAddToCardButtons();
  setupFAQ();
  setupOffersAccordions();
  setupOfferItemDescriptions();
  setupAddToCartStickyButton();
});
