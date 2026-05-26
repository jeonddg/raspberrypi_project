const body = document.body;
const progressBar = document.querySelector(".scroll-progress");
const themeToggle = document.querySelector(".theme-toggle");
const themeText = document.querySelector(".theme-text");
const navLinks = Array.from(document.querySelectorAll(".top-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const updatedDate = document.querySelector("#updated-date");

const savedTheme = localStorage.getItem("project-plan-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeText.textContent = "Light";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeText.textContent = isDark ? "Light" : "Dark";
  localStorage.setItem("project-plan-theme", isDark ? "dark" : "light");
});

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

function updateActiveNav() {
  const current = sections
    .slice()
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= 120);

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

function updateUiOnScroll() {
  updateScrollProgress();
  updateActiveNav();
}

const today = new Date();
const dateText = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(today);

updatedDate.textContent = dateText;
updatedDate.dateTime = today.toISOString().slice(0, 10);

window.addEventListener("scroll", updateUiOnScroll, { passive: true });
window.addEventListener("resize", updateUiOnScroll);
updateUiOnScroll();
