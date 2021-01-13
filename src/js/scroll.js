document.addEventListener("click", function (e) {
  if (e.target.classList.contains("header__nav-links-link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
