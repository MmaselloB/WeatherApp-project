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
  console.log(response);
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
}

let apiKey = "29be3da14fc4c0f2dtc483179d3f7o00";
let city = "Lisbon";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=29be3da14fc4c0f2dtc483179d3f7o00&units=metric`;

axios.get(apiUrl).then(showTemperature);
