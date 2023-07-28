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

function showTemperature(response) {
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let description = document.querySelector("#condition");
  description.innerHTML = response.data.condition.description;
  let location = document.querySelector("#city");
  location.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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
search("Pretoria");
let form = document.querySelector("#search-bar");
form.addEventListener("submit", DisplayCity);
