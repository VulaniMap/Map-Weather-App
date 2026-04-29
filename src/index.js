function updateWeather(response) {
  let valueElement = document.querySelector("#value");
  let value = response.data.temperature.current;
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  time.innerHTML = formatDate(date);
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  description.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  valueElement.innerHTML = Math.round(value);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;

  getForecast(response.data.city);
}
function formatDate(date) {
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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
  let formattedDay = days[date.getDay()];
  return `${formattedDay} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "aofcd5541add57c0396398488b47at43";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "aofcd5541add57c0396398488b47at43";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6)
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-data">
      <div class="forecast-day">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="forecast-icon"/>
      
      <div class="forecast-temperatures">
       <div class="forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
      <div class="forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
     </div>
          </div>
`;
  });
  let forecast = document.querySelector("#weather-forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Cape Town");
