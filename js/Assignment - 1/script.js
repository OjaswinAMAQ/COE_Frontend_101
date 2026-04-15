// ===============================
// VARIABLES
// ===============================
const startBtn = document.getElementById("start-btn");
const retakeBtn = document.getElementById("retake-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressFill = document.getElementById("progress-fill");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const timeTakenElement = document.getElementById('time-taken');

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const finalScore = document.getElementById("final-score");
const customMessage = document.getElementById("custom-message");

// ===============================
// QUIZ DATA
// ===============================
const questions = [
  {
    question: "Which of the following is a core TechNova value?",
    options: [
      { text: "Speed", isCorrect: false },
      { text: "Sustainability", isCorrect: false },
      { text: "Security", isCorrect: true },
      { text: "Style", isCorrect: false },
    ],
    explanation:
      "Security is a core value at TechNova due to our enterprise clients.",
  },
  {
    question: "When does TechNova provide health insurance?",
    options: [
      { text: "After 3 months", isCorrect: false },
      { text: "From day one", isCorrect: true },
      { text: "After 6 months", isCorrect: false },
      { text: "Not provided", isCorrect: false },
    ],
    explanation: "Correct! TechNova offers health insurance from day one.",
  },
  {
    question: "Which of these is NOT allowed under our security policy?",
    options: [
      { text: "Using strong passwords", isCorrect: false },
      { text: "Sharing passwords", isCorrect: true },
      { text: "Two-factor authentication", isCorrect: false },
      { text: "Locking your screen", isCorrect: false },
    ],
    explanation:
      "Sharing passwords is strictly prohibited under TechNova security policies.",
  },
  {
    question: "TechNova encourages employees to...",
    options: [
      { text: "Work in silos", isCorrect: false },
      { text: "Innovate constantly", isCorrect: true },
      { text: "Ignore documentation", isCorrect: false },
      { text: "Avoid feedback", isCorrect: false },
    ],
    explanation: "Correct! Innovation is encouraged for all employees.",
  },
  {
    question: "How can you access onboarding resources?",
    options: [
      { text: "Company portal", isCorrect: true },
      { text: "Third-party sites", isCorrect: false },
      { text: "Social media", isCorrect: false },
      { text: "Never", isCorrect: false },
    ],
    explanation:
      "All onboarding resources are available on the internal company portal.",
  },
];

let currentQuestion = 0;
let score = 0;
let startTime;
let endTime;

totalElement.textContent = questions.length;

// ==============================================================
// Shuffling the questions and answers
// ==============================================================
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ===============================
// Functions
// ===============================
function showScreen(screen) {
  [welcomeScreen, quizScreen, resultScreen].forEach((s) =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
}


function startQuiz() {
  shuffleArray(questions);
  questions.forEach((q) => shuffleArray(q.options));

  currentQuestion = 0;
  score = 0;
  startTime = Date.now();

  scoreElement.textContent = score;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  const progress = (currentQuestion / questions.length) * 100;

  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";
  progressFill.style.width = `${progress}%`;

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.classList.add("option-btn");

    btn.dataset.correct = option.isCorrect;
    btn.addEventListener('click', () => checkAnswer(btn));
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(btn) {
  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;

    if (b.dataset.correct === "true") {
      b.classList.add('correct');
    }
  });

  if (btn.dataset.correct === "true") {
    score++;
    scoreElement.textContent = score;
    correctSound.play();
  } else {
    btn.classList.add('wrong');
    wrongSound.play();
  }

  const expl = document.createElement('p');
  expl.textContent = questions[currentQuestion].explanation;
  optionsContainer.appendChild(expl);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      endQuiz();
    }
  }, 2000);
}

function endQuiz() {
  endTime = Date.now();
  const seconds = Math.floor((endTime - startTime) / 1000);

  finalScore.textContent = `You scored ${score} out of ${questions.length}.`;

  if (score === questions.length)
    customMessage.textContent = "Excellent! You’re off to a great start.";
  else if (score >= 3)
    customMessage.textContent =
      "Nice job! Review our documentation to improve.";
  else
    customMessage.textContent =
      "Don’t worry — visit our onboarding resources again.";

  customMessage.textContent = "Excellent! You’re off to a great start.";
  timeTakenElement.textContent = `Time taken: ${seconds} seconds.`;

  showScreen(resultScreen);
}

function retakeQuiz() {
  startQuiz();
}

// ===============================
// EVENTS
// ===============================
startBtn.addEventListener("click", startQuiz);
retakeBtn.addEventListener("click", retakeQuiz);
