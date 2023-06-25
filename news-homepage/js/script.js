const menuButton = document.getElementById("menu-button"),
  navBar = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
  if (navBar.classList.contains("nav-opened")) {
    navBar.classList.remove("nav-opened");
    menuButton.setAttribute("src", "assets/images/icon-menu.svg");
  } else {
    navBar.classList.add("nav-opened");
    menuButton.setAttribute("src", "assets/images/icon-menu-close.svg");
  }
});
