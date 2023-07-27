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
}

let apiKey = "29be3da14fc4c0f2dtc483179d3f7o00";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Pretoria&key=29be3da14fc4c0f2dtc483179d3f7o00&units=metric`;

axios.get(apiUrl).then(showTemperature);
