const themeToggle = document.getElementById('theme-toggle');
const body = document.body;


if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
} else {
  body.classList.add('light-mode');
}


themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
});
