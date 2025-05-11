const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = 'Light Mode';
} else {
  body.classList.add('light-mode');
  themeToggle.textContent = 'Dark Mode';
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = 'Dark Mode';
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = 'Light Mode';
  }
});

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.querySelector('input[type="text"]').value;
  const password = document.querySelector('input[type="pass"]').value;

  const newUser = { username, password };

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(res => res.json())
  .then(data => {
    console.log('User saved:', data);
    alert('User saved to db.json!');
  })
  .catch(err => {
    console.error('Error saving user:', err);
    alert('Failed to save user.');
  });
});