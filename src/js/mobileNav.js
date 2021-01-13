const burguer = document.querySelector(".burguer");
const mobileNav = document.querySelector(".mobile-nav");
const links = mobileNav.querySelectorAll("a");

burguer.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  burguer.classList.toggle("toggle");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    burguer.classList.toggle("toggle");
  });
});
