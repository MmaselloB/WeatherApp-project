function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {


  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="forecastDay">${day}</div>

                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-max">30°</span>|<span
                    class="weather-forecast-min"
                    >10°</span
                  >
                </div>
              </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coords) {
  console.log(coords);
  let apiKey = "29be3da14fc4c0f2dtc483179d3f7o00";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${coords.lon}&lat=${coords.lat}&key=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
  
}
function showTemperature(response) {
  getForecast(response.data.coordinates);

  celsuisTemperature = response.data.temperature.current;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let description = document.querySelector("#condition");
  description.innerHTML = response.data.condition.description;

  let location = document.querySelector("#city");
  location.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsuisTemperature);

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = formatDate(response.data.temperature.time * 1000);

  let weatherIcon = document.querySelector("#imgIcon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.description);
}

function DisplayCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  search(citySearch.value);
}
function search(city) {
  let apiKey = "29be3da14fc4c0f2dtc483179d3f7o00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showFahernheit(event) {
  event.preventDefault();
  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsuisTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsuis(event) {
  event.preventDefault();
  celsuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsuisTemperature);
}
let celsuisTemperature = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", DisplayCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahernheit);

let celsuisLink = document.querySelector("#celsuis-link");
celsuisLink.addEventListener("click", showCelsuis);

search("Pretoria");
displayForecast();
