function updateWeather(response) {
  let valueElement = document.querySelector("#value");
  let value = response.data.temperature.current;
  let city = document.querySelector("#current-city");

  city.innerHTML = response.data.city;
  valueElement.innerHTML = Math.round(value);
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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Cape Town");
