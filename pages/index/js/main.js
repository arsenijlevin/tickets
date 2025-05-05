import { setupSharedJS } from "../../shared/js/shared";
import { setupOffersAccordions } from "./accordion";
import { setupAddToCardButtons } from "./add-to-card";
import { setupAddToCartStickyButton } from "./add-to-cart-sticky-button";
import { setupOfferItemDescriptions } from "./expand-description";
import { setupFAQ } from "./faq";
import { setupHeaderCart } from "./header-cart";

document.addEventListener("DOMContentLoaded", () => {
  setupSharedJS();

  setupOffersAccordions();
  setupOfferItemDescriptions();
  setupFAQ();
  setupHeaderCart();
  setupAddToCardButtons();
  setupAddToCartStickyButton();
});
