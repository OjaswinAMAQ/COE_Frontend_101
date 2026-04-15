// ===============================
// FAQ DATA
// ===============================
const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "Click the 'Forgot Password' link on the login page and follow the instructions.",
  },
  {
    question: "Where can I find my invoices?",
    answer:
      "Invoices are located under your account settings, in the 'Billing' section.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach support via the 'Contact Us' page or live chat during business hours.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Refunds are available within 30 days of purchase if the service was not used.",
  },
  {
    question: "Can I upgrade my plan?",
    answer:
      "Yes, you can upgrade your plan from your account dashboard at any time.",
  },
];

// ===============================
// GLOBAL VARIABLES
// ===============================
const faqContainer = document.getElementById("faqContainer");
const searchInput = document.getElementById("faqSearch");
const expandAllBtn = document.getElementById("expandAll");
const collapseAllBtn = document.getElementById("collapseAll");

// ===============================
// RENDER FAQs
// ===============================
function renderFAQs(faqArray) {
  faqContainer.innerHTML = "";

  faqArray.forEach((faq, index) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    const questionBtn = document.createElement("button");
    questionBtn.classList.add("faq-question");
    questionBtn.setAttribute("aria-expanded", "false");
    questionBtn.setAttribute("aria-controls", `faq-answer-${index}`);
    questionBtn.setAttribute("id", `faq-question-${index}`);
    questionBtn.innerHTML = `
      ${faq.question}
      <span class="faq-icon">+</span>
    `;

    const answerDiv = document.createElement("div");
    answerDiv.classList.add("faq-answer");
    answerDiv.setAttribute("id", `faq-answer-${index}`);
    answerDiv.setAttribute("role", "region");
    answerDiv.setAttribute("aria-labelledby", `faq-question-${index}`);
    answerDiv.innerHTML = `<p>${faq.answer}</p>`;

    faqItem.appendChild(questionBtn);
    faqItem.appendChild(answerDiv);
    faqContainer.appendChild(faqItem);

    // ===============================
    // EVENT HANDLERS (CLICK + KEYBOARD)
    // ===============================
    const handleKeyNavigation = (e) => {
      const questions = Array.from(document.querySelectorAll(".faq-question"));
      const currentIndex = questions.indexOf(questionBtn);

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          toggleFAQ(questionBtn);
          break;

        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < questions.length - 1) {
            questions[currentIndex + 1].focus();
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            questions[currentIndex - 1].focus();
          }
          break;
      }
    };

    questionBtn.addEventListener("click", () => toggleFAQ(questionBtn));
    questionBtn.addEventListener("keydown", handleKeyNavigation);
  });
}

// ===============================
// TOGGLE FAQ (ELEMENT-BASED)
// ===============================
function toggleFAQ(clickedBtn) {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const isTarget = questionBtn === clickedBtn;
    const isExpanded = item.classList.contains("expanded");

    item.classList.remove("expanded");
    questionBtn.setAttribute("aria-expanded", "false");

    if (isTarget && !isExpanded) {
      item.classList.add("expanded");
      questionBtn.setAttribute("aria-expanded", "true");
    }
  });
}

// ===============================
// CLOSE ALL
// ===============================
function closeAllFAQs() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("expanded");
    item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
  });
}

// ===============================
// EXPAND ALL
// ===============================
function expandAllFAQs() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.add("expanded");
    item.querySelector(".faq-question").setAttribute("aria-expanded", "true");
  });
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm)
  );
  renderFAQs(filteredFAQs);
});

// ===============================
// BUTTON EVENTS
// ===============================
expandAllBtn.addEventListener("click", expandAllFAQs);
collapseAllBtn.addEventListener("click", closeAllFAQs);

// ===============================
// INITIAL RENDER
// ===============================
renderFAQs(faqs);
