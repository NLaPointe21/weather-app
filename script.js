let now = new Date();
let dateTime = document.querySelector(".date-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();

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
let month = months[now.getMonth()];

function addZeroHours() {
  if (hours < 10) {
    return (hours = "0" + hours);
  } else {
    return hours;
  }
}
let hours = now.getHours();
let hoursZero = addZeroHours();

function addZeroMinutes() {
  if (minutes < 10) {
    return (minutes = "0" + minutes);
  } else {
    return minutes;
  }
}
let minutes = now.getMinutes();
let minutesZero = addZeroMinutes();

dateTime.innerHTML = `${day}, ${date} ${month} | ${hours}:${minutes}`;

// ------------------------------City Search w/out API -------------------------------------------------
// function citySearch(event) {
//   event.preventDefault();
//   let citySearched = document.querySelector("#city-search");

//   let h2 = document.querySelector("h2");
//   h2.innerHTML = `${citySearched.value}`;
// }

// let form = document.querySelector("#search-form");
// form.addEventListener("submit", citySearch);

// // ----------------------------°C/°F Change w/out API ------------------------------------------------
// function celcius(event) {
//   event.preventDefault();
//   let cTemp = document.querySelector("#current-temp");
//   cTemp.innerHTML = `17`;
//   let cBold = document.querySelector(".metric-units");
//   cBold.innerHTML = `<strong>°C</strong>`;
//   let fNotBold = document.querySelector(".imperial-units");
//   fNotBold.innerHTML = `°F`;
// }

// let celciusTemp = document.querySelector(".metric-units");
// celciusTemp.addEventListener("click", celcius);

// function farenheit(event) {
//   event.preventDefault();
//   let fTemp = document.querySelector("#current-temp");
//   fTemp.innerHTML = `62`;
//   let fBold = document.querySelector(".imperial-units");
//   fBold.innerHTML = `<strong>°F</strong>`;
//   let cNotBold = document.querySelector(".metric-units");
//   cNotBold.innerHTML = `°C`;
// }

// let farenheitTemp = document.querySelector(".imperial-units");
// farenheitTemp.addEventListener("click", farenheit);

// ------------------------------------------City Search Weather------------------------------------------
function citySearch(event) {
  event.preventDefault();
  let apiKey = "bcab18012202c8b1538d81911758744a";
  let searchInput = document.querySelector("#city-search");
  let city = searchInput.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", citySearch);

// // -------------------------------------Current Location Weather-----------------------------------------
function showTemp(response) {
  let city = response.data.name;
  let cityName = document.querySelector("h2");
  cityName.innerHTML = `${city}`;
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temp}`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector(".weather-description");
  description.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "bcab18012202c8b1538d81911758744a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getCurrentPosition);
