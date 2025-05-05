export function setupFAQ() {
  document.querySelectorAll(".faq-question").forEach((faq) => {
    const header = faq.querySelector(".faq-question__header");
    const toggleButton = faq.querySelector(".btn-faq-question-toggle");
    const answerContent = faq.querySelector(".faq-question__answer");

    // Add event listener to the entire header
    header.addEventListener("click", () => {
      const isOpen = faq.classList.contains("open");

      if (isOpen) {
        // Close
        closeAnswer(answerContent, toggleButton);
        faq.classList.remove("open");
      } else {
        // Open
        openAnswer(answerContent, toggleButton);
        faq.classList.add("open");
      }
    });
  });
}

function openAnswer(content, button) {
  content.style.height = content.scrollHeight + "px";
  content.setAttribute("aria-hidden", "false");
  button.setAttribute("aria-expanded", "true");
}

function closeAnswer(content, button) {
  content.style.height = content.scrollHeight + "px";
  requestAnimationFrame(() => {
    content.style.height = "0";
  });
  content.setAttribute("aria-hidden", "true");
  button.setAttribute("aria-expanded", "false");
}
