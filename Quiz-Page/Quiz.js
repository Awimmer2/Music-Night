const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const retakeBtn = document.getElementById('retake-btn');
const form = document.getElementById('quiz-form');

let currentQuestion = 0;

nextBtn.addEventListener('click', () => {
  // Ensure an answer is selected
  const currentInputs = questions[currentQuestion].querySelectorAll('input');
  const answered = [...currentInputs].some(input => input.checked);

  if (!answered) {
    alert("Please select an answer before continuing.");
    return;
  }

  // Hide current question
  questions[currentQuestion].style.display = 'none';
  currentQuestion++;

  if (currentQuestion < questions.length) {
    // Show next question
    questions[currentQuestion].style.display = 'block';
  } else {
    // Quiz finished — calculate result
    showResult();
  }
});

retakeBtn.addEventListener('click', () => {
  // Reset everything
  form.reset();
  resultDiv.style.display = 'none';
  retakeBtn.style.display = 'none';
  currentQuestion = 0;
  questions.forEach((q, i) => {
    q.style.display = i === 0 ? 'block' : 'none';
  });
});

function showResult() {
  const formData = new FormData(form);
  const scores = { rock: 0, pop: 0, jazz: 0, hiphop: 0 };

  for (let value of formData.values()) {
    if (scores[value] !== undefined) {
      scores[value]++;
    }
  }

  // Find top genre
  let topGenre = null;
  let topScore = 0;
  for (let genre in scores) {
    if (scores[genre] > topScore) {
      topScore = scores[genre];
      topGenre = genre;
    }
  }

  resultDiv.textContent = `Your top genre is: ${topGenre.toUpperCase()}`;
  resultDiv.style.display = 'block';
  retakeBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none'; // 👈 This line hides the Next button
}