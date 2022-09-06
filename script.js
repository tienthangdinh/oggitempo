//--------------------Themes Toggle---------------------------

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

//------------------Mobile Hamburger-------------------

const hamburger = document.getElementById("hamburger");
const collapse = document.getElementById("collapse");

hamburger.addEventListener("click", () => {
  let top = collapse.style.top;
  collapse.style.top = top == "-100%" ? "3.2rem" : "-100%";
});

//-------------------------API---------------------------

//-----------input city---------------
const listofsearchbars = document.getElementsByTagName("form");
const searchbar0 = document.querySelector("#subnav > form > input[type=text]");
const searchbar1 = document.querySelector(
  "#landingsection > form > input[type=text]"
);
const carousel = document.querySelector("#carousel");
const landingsection = document.querySelector("#landingsection");
const navsearchbar = document.querySelector("#subnav > .searchbar");

listofsearchbars[1].addEventListener("submit", (e) => {
  e.preventDefault();
  landingsection.style.display = "none";
  navsearchbar.style.visibility = "visible";
  const city = searchbar1.value;
  if (city) {
    getWeather(city);
  }
});

listofsearchbars[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchbar0.value;
  if (city) {
    getWeather(city);
  }
});

//-----------fetch weather info------------

const apikey = "bb27bb9276e62533a17594b47eef09c1";
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const KtoC = (K) => Math.floor(K - 273.15);

async function getWeather(city) {
  try {
    const response = await fetch(url(city));
    const result = await response.json();
    console.log(result);
    console.log(`${city} ` + KtoC(result.main.temp) + "°C");
  } catch (error) {
    console.log("error");
  }
}
