const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const resultContainer = document.querySelector('.quiz-result');
const retakeBtn = document.getElementById('retake-btn');
const form = document.getElementById('quiz-form');
const recommendationSection = document.getElementById('recommendation-section');
const recommendationContainer = document.getElementById('recommendation-container');

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
  recommendationSection.style.display = 'none';
  recommendationContainer.innerHTML = '';
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

  fetchPlaylistsForGenre(topGenre);
}

function fetchPlaylistsForGenre(genre) {
  const API_URL = `https://v1.nocodeapi.com/audiwtvr/spotify/YuebOBqnEKVGhfYO/search?q=${genre}&type=playlist&limit=10`;

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const playlists = data.playlists?.items || [];

      if (playlists.length === 0) {
        recommendationSection.style.display = 'block';
        recommendationContainer.innerHTML = "<p>No playlists found.</p>";
        return;
      }

      const selectedPlaylists = [];
      const usedIndexes = new Set();
      while (selectedPlaylists.length < 3 && usedIndexes.size < playlists.length) {
        const i = Math.floor(Math.random() * playlists.length);
        if (!usedIndexes.has(i)) {
          selectedPlaylists.push(playlists[i]);
          usedIndexes.add(i);
        }
      }

      recommendationContainer.innerHTML = '';
      selectedPlaylists.forEach(playlist => {
        const card = document.createElement('div');
        card.style.width = "200px";
        card.style.textAlign = "center";

        card.innerHTML = `
          <img src="${playlist.images[0]?.url || ''}" alt="Playlist Cover" style="width: 100%; border-radius: 10px;">
          <h3 style="font-size: 18px; margin: 10px 0;">${playlist.name}</h3>
          <a href="${playlist.external_urls.spotify}" target="_blank" style="text-decoration: none; color: #1DB954; font-weight: bold;">
            Listen on Spotify
          </a>
        `;

        recommendationContainer.appendChild(card);
      });

      recommendationSection.style.display = 'block';
    })
    .catch(err => {
      console.error('Error fetching playlists:', err);
      recommendationContainer.innerHTML = "<p>Error loading recommendations.</p>";
      recommendationSection.style.display = 'block';
    });
}