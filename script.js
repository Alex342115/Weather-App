const apiKey = "367f7137a246e150ac242789b0093799";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector(".search input");
const searchBTN = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const toggleSwitch = document.querySelector(".toggle-btn");
const bodyBackgound = document.querySelector("body");
var currentTemp;
var tempCelcius = true;
console.log(bodyBackgound);
async function checkWeather(city) {
  const response = await fetch(apiURL + `&appid=${apiKey}` + `&q=${city}`);

  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    currentTemp = data.main.temp;
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".description").innerHTML =
      data.weather[0].description;
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/Rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBTN.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

toggleSwitch.addEventListener("click", () => {
  if (tempCelcius) {
    var tempF = (currentTemp * 9) / 5 + 32;
    document.querySelector(".temp").innerHTML =
      parseFloat(tempF.toFixed(2)) + "°F";
    document.querySelector(".toggle-btn").innerHTML = "°C";
    tempCelcius = false;
  } else {
    document.querySelector(".temp").innerHTML = currentTemp + "°C";
    document.querySelector(".toggle-btn").innerHTML = "°F";
    tempCelcius = true;
  }
});
