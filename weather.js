const apiKey = "aacd19609789099536e5f7b13f2bb279";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".rain-temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "sun.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "Mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
