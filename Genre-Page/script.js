const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Update button text
  if (document.body.classList.contains("light-mode")) {
    toggleBtn.textContent = "Dark Mode";
    toggleBtn.classList.remove("btn-light");
    toggleBtn.classList.add("btn-dark", "text-white");
  } else {
    toggleBtn.textContent = "Light Mode";
    toggleBtn.classList.remove("btn-dark", "text-white");
    toggleBtn.classList.add("btn-light");
  }
});