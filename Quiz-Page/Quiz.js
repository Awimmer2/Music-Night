const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const resultContainer = document.querySelector('.quiz-result');
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
  resultContainer.style.display = 'none';
  currentQuestion = 0;
  questions.forEach((q, i) => {
    q.style.display = i === 0 ? 'block' : 'none';
  });
  nextBtn.style.display = 'inline-block'; // Show the "Next" button again
});

function showResult() {
  const formData = new FormData(form);

  const scores = {
    pop: 0,
    hiphop: 0,
    rock: 0,
    rnb: 0,         // Use 'rnb' as key for 'r&b' (HTML doesn't allow & in values)
    classical: 0,
    metal: 0,
    country: 0,
    jazz: 0,
    latin: 0
  };

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

  // Optional: format 'rnb' as 'R&B' in the result
  const displayName = topGenre === 'rnb' ? 'R&B' : topGenre.toUpperCase();

  resultDiv.textContent = `Your genre is: ${displayName}`;
  resultContainer.style.display = 'flex';
  nextBtn.style.display = 'none';
}