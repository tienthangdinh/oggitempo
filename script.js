//--------------------Themes Toggle---------------------------
const themeButtonMobile = document.querySelector("#options > li:nth-child(1)");
const themeButton = document.getElementById("subthemes");
const mainnav = document.getElementById("mainnav");
const collapse = document.getElementById("collapse");
const mobilenav = document.getElementById("mobilenav");
let resultbox = document.getElementById("resultbox");
let currentTheme = "dark";
let lastsearch = "";

themeButton.addEventListener("click", () => {
  if (currentTheme === "dark") {
    document.body.style.backgroundImage = 'url("./images/BGlight.png")';
    mainnav.style.backgroundColor = "#03657C";
    resultbox.style.backgroundColor = "#03657Ca7";
    collapse.style.backgroundColor = "#03657C";
    mobilenav.style.backgroundColor = "#03657C";
    currentTheme = "light";
  } else if (currentTheme === "light") {
    document.body.style.backgroundImage = 'url("./images/BGdark.png")';
    mainnav.style.backgroundColor = "#462c4c";
    resultbox.style.backgroundColor = "#462c4ca7";
    mobilenav.style.backgroundColor = "#462c4c";
    collapse.style.backgroundColor = "#462c4c";
    currentTheme = "dark";
  }
});
themeButtonMobile.addEventListener("click", () => {
  if (currentTheme === "dark") {
    document.body.style.backgroundImage = 'url("./images/BGlight.png")';
    mainnav.style.backgroundColor = "#03657C";
    resultbox.style.backgroundColor = "#03657Ca7";
    collapse.style.backgroundColor = "#03657C";
    mobilenav.style.backgroundColor = "#03657C";
    currentTheme = "light";
  } else if (currentTheme === "light") {
    document.body.style.backgroundImage = 'url("./images/BGdark.png")';
    mainnav.style.backgroundColor = "#462c4c";
    resultbox.style.backgroundColor = "#462c4ca7";
    mobilenav.style.backgroundColor = "#462c4c";
    collapse.style.backgroundColor = "#462c4c";
    currentTheme = "dark";
  }
});

//------------------Mobile Hamburger-------------------

const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  let top = collapse.style.top;
  if (top === "3.2rem") {
    collapse.style.top = "-100%";
  } else {
    collapse.style.top = "3.2rem";
  }
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
    lastsearch = city;
  }
});

listofsearchbars[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchbar0.value;
  if (city) {
    getWeather(city);
    lastsearch = city;
  }
});

const mobilelogo = document.getElementById("mobilelogo");
const mainlogo = document.getElementById("mainlogo");
const logos = [mainlogo, mobilelogo];
logos.forEach((elem) => {
  elem.addEventListener("click", () => {
    landingsection.style.display = "flex";
    navsearchbar.style.visibility = "hidden";
  });
});

//-----------fetch weather info------------

const apikey = "586123e42d6868e0ac3177be248417fa";
const url = (city) => {
  if (language === "eng") {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  } else {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=it`;
  }
};
const forecast = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${apikey}`;
const KtoC = (K) => Math.floor(K - 273.15);

async function getWeather(city) {
  try {
    const response = await fetch(url(city));
    const result = await response.json();
    const forecastresponse = await fetch(forecast(city));
    const forecastresult = await forecastresponse.json();
    console.log(result);
    console.log(forecastresult);
    addWeathertoPage(result, forecastresult);
  } catch (error) {
    console.log(error);
  }
}

//----------------add weather result to page----------------
const resultsection = document.getElementById("resultsection");
const citynamesection = document.querySelector("#resultsection > h1");

const addWeathertoPage = (responsedata, forecastresponsedata) => {
  const cityname = responsedata.name;
  const weathercondition = responsedata.weather[0].description;
  const temp = KtoC(responsedata.main.temp);
  const feelsLike = KtoC(responsedata.main.feels_like);
  const humidity = responsedata.main.humidity;
  const wind = responsedata.wind.speed; // Unit m/s
  const visibility = responsedata.visibility / 1000;

  citynamesection.innerHTML = cityname;

  let newresultbox = document.createElement("div");
  newresultbox.id = "resultbox";
  if (currentTheme === "light") {
    newresultbox.style.backgroundColor = "#03657Ca7";
  }
  newresultbox.innerHTML = `
            <div id="temp">
              <h2>${weathercondition}</h2>
              <div>${temp}<span>&#176;</span></div>
            </div>
            <div id="details">
              <h2>DETAILS</h2>
              <hr />
              <table>
                <tr>
                  <td>Feels like:</td>
                  <td>${feelsLike}<span>&#176;</span></td>
                </tr>
                <tr>
                  <td>Humidity:</td>
                  <td>${humidity}%</td>
                </tr>
                <tr>
                  <td>Wind:</td>
                  <td>${wind}m/s</td>
                </tr>
                <tr>
                  <td>Visibility:</td>
                  <td>${visibility}km</td>
                </tr>
              </table>
            </div>

            <div class="col" id="morning">
              <h3>Morning</h3>
              <div class="visual">
                <img src=${chooseicon(
                  forecastresponsedata.list[0].weather[0].id
                )} alt="morning" />
              </div>
            </div>
            <div class="col" id="afternoon">
              <h3>Afternoon</h3>
              <div class="visual">
                <img src=${chooseicon(
                  forecastresponsedata.list[2].weather[0].id
                )} alt="afernoon" />
              </div>
            </div>
            <div class="col" id="night">
              <h3>Night</h3>
              <div class="visual">
                <img src=${chooseicon(
                  forecastresponsedata.list[4].weather[0].id
                )} alt="night" />
              </div>
            </div>
  `;
  resultbox.replaceWith(newresultbox);
  resultbox = newresultbox;
  if (language === "eng") {
    changelanguage("eng");
  } else {
    changelanguage("ita");
  }
};

//choose icon
const chooseicon = (weatherid) => {
  if (200 <= weatherid && weatherid <= 211) {
    return "./icons/Lightning.png";
  } else if (212 <= weatherid && weatherid <= 232) {
    return "./icons/Thunder.png";
  } else if (300 <= weatherid && weatherid <= 321) {
    return "./icons/Rainy.png";
  } else if (500 <= weatherid && weatherid <= 531) {
    return "./icons/Storm.png";
  } else if (600 <= weatherid && weatherid <= 622) {
    return "./icons/Snowy.png";
  } else if (701 <= weatherid && weatherid <= 741) {
    return "./icons/Foggy.png";
  } else if (751 <= weatherid && weatherid <= 781) {
    return "./icons/Windy.png";
  } else if (800 == weatherid) {
    return "./icons/Sun.png";
  } else if (801 <= weatherid && weatherid <= 804) {
    return "./icons/Cloudy.png";
  }
  return "./icons/Cloudy.png";
};

//-----------------------change language-------------------------------------
const langButtonMobile = document.querySelector("#options > li:nth-child(2)");
const langButton = document.getElementById("language");
const langarray = [langButton, langButtonMobile];
let language = "eng";

langarray.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    if (language === "eng") {
      changelanguage("ita");
      getWeather(lastsearch);
    } else {
      changelanguage("eng");
      getWeather(lastsearch);
    }
  });
});

changelanguage = (langoption) => {
  //textes that change with language
  const textspan2 = document.getElementById("span2");
  const texttheme = document.querySelector(
    "#options > li:nth-child(1) > span:nth-child(2)"
  );
  const texteng = document.getElementById("eng");
  const textita = document.getElementById("ita");
  const textprompt = document.querySelector("#landingsection > h1");
  const textdetails = document.querySelector("#details > h2");
  const textfeelslike = document.querySelector(
    "#details > table > tbody > tr:nth-child(1) > td:nth-child(1)"
  );
  const textwind = document.querySelector(
    "#details > table > tbody > tr:nth-child(3) > td:nth-child(1)"
  );
  const texthumidity = document.querySelector(
    "#details > table > tbody > tr:nth-child(2) > td:nth-child(1)"
  );
  const textvisibility = document.querySelector(
    "#details > table > tbody > tr:nth-child(4) > td:nth-child(1)"
  );
  const textmorning = document.querySelector("#morning > h3");
  const textafternoon = document.querySelector("#afternoon > h3");
  const textnight = document.querySelector("#night > h3");

  if (langoption == "ita") {
    textspan2.innerHTML = "ITA";
    texttheme.innerHTML = "tema";
    texteng.style.fontWeight = "300";
    textita.style.fontWeight = "600";
    textprompt.innerHTML = "come stai oggi?";
    textdetails.innerHTML = "DETTAGLIO";
    textfeelslike.innerHTML = "sentito come";
    textwind.innerHTML = "vento";
    texthumidity.innerHTML = "umidità";
    textvisibility.innerHTML = "visibilità";
    textmorning.innerHTML = "mattina";
    textafternoon.innerHTML = "pomeriggio";
    textnight.innerHTML = "notte";
    language = "ita";
  } else {
    // getWeather(lastsearch);
    textspan2.innerHTML = "ENG";
    texttheme.innerHTML = "Theme";
    texteng.style.fontWeight = "600";
    textita.style.fontWeight = "300";
    textprompt.innerHTML = "how are you today?";
    textdetails.innerHTML = "DETAILS";
    textfeelslike.innerHTML = "feels like";
    textwind.innerHTML = "wind";
    texthumidity.innerHTML = "humidity";
    textvisibility.innerHTML = "visibility";
    textmorning.innerHTML = "morning";
    textafternoon.innerHTML = "afternoon";
    textnight.innerHTML = "night";
    language = "eng";
  }
};
