const questions = [
{
  question: "1. How many planets are in the solar system?",
  options: ["8", "9", "10"],
  answer: "8"
},
{
  question: "2. What is the freezing point of water?",
  options: ["0", "-5", "-6"],
  answer: "0"
},
{
  question: "3. What is the longest river in the world?",
  options: ["Nile", "Amazon", "Yangtze"],
  answer: "Nile"
},
{
  question: "4. How many chromosomes are in the human genome?",
  options: ["42", "44", "46"],
  answer: "46"
},
{
  question: "5. Which of these characters are friends with Harry Potter?",
  options: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
  answer: "Ron Weasley"
},
{
  question: "6. What is the capital of Canada?",
  options: ["Toronto", "Ottawa", "Vancouver"],
  answer: "Ottawa"
},
{
  question: "7. What is the Jewish New Year called?",
  options: ["Hanukkah", "Yom Kippur", "Kwanzaa"],
  answer: "Yom Kippur"
}
];

const questionEl = document.querySelector('.question');
const optionEls = document.querySelectorAll('.option span');
const nextBtn = document.querySelector('.next-btn');
const counterEl = document.querySelector('.counter');
const restartBtn = document.querySelector('.restart-btn');
let inputEls = document.getElementsByTagName('input');

let currentQuestionIndex = 0;
let correctAnswers = 0;

function showQuestion() {
const question = questions[currentQuestionIndex];
questionEl.innerText = question.question;
  for (let i = 0; i < optionEls.length; i++) {
  optionEls[i].innerText = question.options[i];
  inputEls[i].value = question.options[i];
}
counterEl.innerText = `${currentQuestionIndex + 1}/${questions.length}`;
}

function checkAnswer() {
const selectedAnswer = document.querySelector('input[name="answer"]:checked');
if (!selectedAnswer) return;
const answer = selectedAnswer.value;
const question = questions[currentQuestionIndex];
if (answer === question.answer) {
  selectedAnswer.parentElement.classList.add('correct');
  correctAnswers++;
} else {
  selectedAnswer.parentElement.classList.add('incorrect');
}
for (let i = 0; i < inputEls.length; i++) {
  inputEls[i].setAttribute('disabled', 'disabled'); 
}
nextBtn.disabled = false;

}

function resetQuestion() {
Array.from(optionEls).forEach(optionEl => {
  optionEl.parentElement.classList.remove('correct', 'incorrect', 'disabled');
  optionEl.parentElement.querySelector('input').checked = false;
});
nextBtn.disabled = true;
}

function showResult() {
questionEl.innerText = `You got ${correctAnswers} out of ${questions.length} questions correct!`;
optionEls.forEach(optionEl => {
  optionEl.parentElement.classList.add('hidden');
});
counterEl.classList.add('hidden');
nextBtn.classList.add('hidden');
restartBtn.classList.remove('hidden');
}

function restartQuiz() {
currentQuestionIndex = 0;
correctAnswers = 0;
showQuestion();
resetQuestion();
optionEls.forEach(optionEl => {
  optionEl.parentElement.classList.remove('hidden');
});
counterEl.classList.remove('hidden');
nextBtn.classList.remove('hidden');
restartBtn.classList.add('hidden');
}

nextBtn.addEventListener('click', () => {
currentQuestionIndex++;
resetQuestion();
if (currentQuestionIndex === questions.length) {
  showResult();
} else {
  showQuestion();
}
for (let i = 0; i < inputEls.length; i++) {
  inputEls[i].disabled = false;
}
});

restartBtn.addEventListener('click', restartQuiz);

showQuestion();

optionEls.forEach(optionEl => {
optionEl.parentElement.addEventListener('click', checkAnswer);
});