const apiKey = "54bc7509178c5b5b260f54e113eafb55";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let temp, city, humidity, windSpeed, img;
async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    var data = await response.json();

    console.log(data);
    temp = Math.round(data.main.temp);
    humidity = data.main.humidity;
    windSpeed = data.wind.speed;
    city = data.name;
    // console.log(temp,humidity,windSpeed,city);

    document.querySelector(".city").innerHTML = city;
    document.querySelector(".temp").innerHTML = `${temp}°C`;
    document.querySelector(".humidity").innerHTML = `${humidity} %`;
    document.querySelector(".wind").innerHTML = `${windSpeed} km/h`;
    document.querySelector(".info").innerHTML = `${data.weather[0].main}`;

    const icon = data.weather[0].icon;
    img = `${icon}.png`;
    // console.log(img);

    const weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.src = `images/${img}`;

    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});