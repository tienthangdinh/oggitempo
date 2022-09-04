const searchButton = document.querySelector("#landingsection > form > button");
const carousel = document.querySelector("#carousel");
const landingsection = document.querySelector("#landingsection");
const navsearchbar = document.querySelector("#subnav > .searchbar");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  //   carousel.style.transform = `translateY(calc(${-landingsection.offsetHeight}px - 5rem))`;
  // slideshow approach does not work when the width of landingspace itself changes together when view height changes
  //problem solved easily
  landingsection.style.display = "none";
  navsearchbar.style.visibility = "visible";
});

const themeButton = document.getElementById("subthemes");
const mainnav = document.getElementById("mainnav");
const resultbox = document.getElementById("resultbox");
let currentTheme = "dark";

themeButton.addEventListener("click", () => {
  if (currentTheme === "dark") {
    document.body.style.backgroundImage = 'url("./images/BGlight.png")';
    mainnav.style.backgroundColor = "#03657C";
    resultbox.style.backgroundColor = "#03657Ca7";
    currentTheme = "light";
  } else if (currentTheme === "light") {
    document.body.style.backgroundImage = 'url("./images/BGdark.png")';
    mainnav.style.backgroundColor = "#462c4c";
    resultbox.style.backgroundColor = "#462c4ca7";
    currentTheme = "dark";
  }
});

const hamburger = document.getElementById("hamburger");
const collapse = document.getElementById("collapse");

hamburger.addEventListener("click", () => {
  let top = collapse.style.top;
  collapse.style.top = top == "-100%" ? "3.2rem" : "-100%";
});
