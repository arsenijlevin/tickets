export function setupFAQ() {
  document.querySelectorAll(".faq-question").forEach((faq) => {
    const header = faq.querySelector(".faq-question__header");
    const toggleButton = faq.querySelector(".btn-faq-question-toggle");
    const answerContent = faq.querySelector(".faq-question__answer");

    // Click handler for toggle
    header.addEventListener("click", () => {
      toggleFAQ(faq, answerContent, toggleButton);
    });
  });

  // Check if URL contains hash and open corresponding FAQ
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target && target.classList.contains("faq-question")) {
      const answerContent = target.querySelector(".faq-question__answer");
      const toggleButton = target.querySelector(".btn-faq-question-toggle");
      openAnswer(answerContent, toggleButton);
      target.classList.add("open");

      // Scroll into view just in case
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function toggleFAQ(faq, answerContent, toggleButton) {
  const isOpen = faq.classList.contains("open");

  if (isOpen) {
    closeAnswer(answerContent, toggleButton);
    faq.classList.remove("open");
  } else {
    openAnswer(answerContent, toggleButton);
    faq.classList.add("open");
  }
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

function openQuestionOnURLChange() {
  const hash = window.location.hash;
  const target = document.querySelector(hash);

  if (!target || !target.classList.contains("faq-question")) return;

  const answerContent = target.querySelector(".faq-question__answer");
  const toggleButton = target.querySelector(".btn-faq-question-toggle");

  openAnswer(answerContent, toggleButton);

  target.classList.add("open");
}

window.addEventListener("popstate", openQuestionOnURLChange);
