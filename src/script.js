// --------------------------------------- DATE + TIME-------------------------------------------
function formatDate() {
  let date = new Date();

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

  let today = date.getDate();

  let months = [
    "Janurary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${today} ${month} | ${formatHoursMinutes()}`;
}

function formatHoursMinutes() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// -----------------------------------------DISPLAY TEMP-------------------------------------------
function displayTemp(response) {
  let tempElement = document.querySelector("#current-temp");
  let cityName = document.querySelector("h2");
  let descriptionElement = document.querySelector(".weather-description");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let dateElement = document.querySelector(".date-time");
  let iconElement = document.querySelector(".current-day-icon");

  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemp);
  cityName.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
// --------------------------------------------FORECAST------------------------------------------
function displayForecast(response) {
  let forecastElement = document.querySelector(".forecast-div");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2 hourly-forecast">
      <h4>${formatHoursMinutes(forecast.dt * 1000)}</h4>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="weather-icons"/>
      <p>${Math.round(forecast.main.temp)}°</p>
    </div>`;
  }
}
// ----------------------------------------SEARCH FOR CITY---------------------------------------
function search(city) {
  let apiKey = "bcab18012202c8b1538d81911758744a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);

  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchSubmitElement = document.querySelector(".city-search");
  search(searchSubmitElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

// ------------------------------------CURRENT LOCATION SEARCH-------------------------------------
function searchCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bcab18012202c8b1538d81911758744a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCity);
}

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getCurrentPosition);

// ---------------------------------°C to °F-----------------------------------
function displayCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  celciusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  tempElement.innerHTML = Math.round(celciusTemp);
}

function displayFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  celciusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemp = document.querySelector(".imperial-units");
fahrenheitTemp.addEventListener("click", displayFarenheit);

let celciusTemp = document.querySelector(".metric-units");
celciusTemp.addEventListener("click", displayCelcius);

search("Amsterdam");
