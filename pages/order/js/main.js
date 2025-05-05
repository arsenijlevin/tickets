import { setupSharedJS } from "../../shared/js/shared";
import { setupAddToCardButtons } from "./add-to-card";

document.addEventListener("DOMContentLoaded", () => {
  setupSharedJS();

  setupAddToCardButtons();
});
