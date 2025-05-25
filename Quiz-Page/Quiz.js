const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const resultContainer = document.querySelector('.quiz-result');
const retakeBtn = document.getElementById('retake-btn');
const form = document.getElementById('quiz-form');
const playlistContainer = document.getElementById('playlist-container');

let currentQuestion = 0;

nextBtn.addEventListener('click', () => {
  const currentInputs = questions[currentQuestion].querySelectorAll('input');
  const answered = [...currentInputs].some(input => input.checked);

  if (!answered) {
    alert("Please select an answer before continuing.");
    return;
  }

  questions[currentQuestion].style.display = 'none';
  currentQuestion++;

  if (currentQuestion < questions.length) {
    questions[currentQuestion].style.display = 'block';
  } else {
    showResult();
  }
});

retakeBtn.addEventListener('click', () => {
  form.reset();
  resultContainer.style.display = 'none';
  playlistContainer.innerHTML = ''; // Clear playlist
  playlistContainer.style.display = 'none'; // Hide playlist
  currentQuestion = 0;
  questions.forEach((q, i) => {
    q.style.display = i === 0 ? 'block' : 'none';
  });
  nextBtn.style.display = 'inline-block';
});

function showResult() {
  const formData = new FormData(form);
  const scores = {
    pop: 0,
    hiphop: 0,
    rock: 0,
    rnb: 0,
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

  let topGenre = null;
  let topScore = 0;
  for (let genre in scores) {
    if (scores[genre] > topScore) {
      topScore = scores[genre];
      topGenre = genre;
    }
  }

  const displayName = topGenre === 'rnb' ? 'R&B' : topGenre.toUpperCase();
  resultDiv.textContent = `Your genre is: ${displayName}`;
  resultContainer.style.display = 'flex';
  nextBtn.style.display = 'none';

  fetchPlaylist(topGenre);
}

function fetchPlaylist(genre) {
  const API_URL = `https://v1.nocodeapi.com/audiwtvr/spotify/YuebOBqnEKVGhfYO/search?q=${genre}&type=playlist&limit=10`; // replace YOUR_USERNAME

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const playlists = data.playlists?.items || [];
      if (playlists.length === 0) {
        playlistContainer.innerHTML = "<p>No playlists found.</p>";
        playlistContainer.style.display = 'block';
        return;
      }

      const randomIndex = Math.floor(Math.random() * playlists.length);
      const playlist = playlists[randomIndex];

      playlistContainer.innerHTML = `
        <div class="playlist">
          <a href="${playlist.external_urls.spotify}" target="_blank">
            <img src="${playlist.images[0]?.url || ''}" alt="${playlist.name}" />
            <p>${playlist.name}</p>
          </a>
        </div>
      `;
      playlistContainer.style.display = 'block';
    })
    .catch(err => {
      console.error('Error fetching playlist:', err);
      playlistContainer.innerHTML = "<p>Error loading playlist.</p>";
      playlistContainer.style.display = 'block';
    });
}