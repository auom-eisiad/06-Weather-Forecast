 // Global variables
var searchInput = $("#search-input");
var searchHistory = $("#search-history");
var submit = $("#submit-button");

// Hold the API key and store city name from user's input
var apiKey = "26969c8a80538530cc05b672bf826665";
var city;

submit.on("click", function(event) {
  event.preventDefault();

  city = searchInput.val().trim();

  getCityCoord();
  getWeatherAPI();
  fiveDay();
});

function getCityCoord() {
  // Link the city and apikey to the url
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  //console.log(queryURL);
  
  // Send an API request to the third party to get city longitude and latitude
  fetch(queryURL)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    const cityData = {
      city: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon
    }
    
    // console.log(cityData);
    return cityData;
  })
  .then(function (data) {
    getWeatherAPI(data);
    fiveDay(data);
  });
}

function getWeatherAPI(data) {
  // Link city's coordinates and apikey to the url
  var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=` + apiKey;
  // console.log(requestUrl);

  fetch(requestUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    $(".weatherToday").removeClass("d-none");
    $(".cityName").text(city);

    var currentTime = dayjs().format('YYYY-MM-DD');
    $(".cityName").append(" (" + currentTime + ")");
    
    var weatherIcon = $("<img/>")
    weatherIcon.attr("src", `http://openweathermap.org/img/wn/` + data.list[0].weather[0].icon + `.png`);
    $(".cityName").append(weatherIcon);

    // Max temp kelvin convert to fahrenheit
    const tempMaxKelvin = parseFloat(data.list[0].main.temp_max);
    const tempMaxCelsius = tempMaxKelvin - 273.15;
    const tempMaxFahrenheit = (tempMaxCelsius * 9/5) + 32;
    const tempMax = tempMaxFahrenheit.toFixed(1);
  
    // Min temp kelvin convert to fahrenheit
    const tempMinKelvin = parseFloat(data.list[0].main.temp_min);
    const tempMinCelsius = tempMinKelvin - 273.15;
    const tempMinFahrenheit = (tempMinCelsius * 9/5) + 32;
    const tempMin = tempMinFahrenheit.toFixed(1);

    $(".temp").text(`Temp: ` + tempMax + `° /` + tempMin + `°`);
    $(".humidity").text(`Humidity: ` + data.list[0].main.humidity);
    $(".windspd").text(`Wind Speed: ` + data.list[0].wind.speed);
  });
}

function fiveDay(data) {
  // Link city's coordinates and apikey to the url
  var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=` + apiKey;
  // console.log(requestUrl);

  fetch(requestUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    $(".weatherForecast").removeClass("d-none");

    for (var i = 1; i < 6; i++) {
      var fiveDayWeather = $(".forecast5day");
      var fiveDayweatherURL = `http://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png`;
      fiveDayWeather.append(`<img src="${fiveDayweatherURL}" alt="5 Day Weather Icons">`);
      
      // Max temp kelvin convert to fahrenheit
      const tempMaxKelvin = parseFloat(data.list[i].main.temp_max);
      const tempMaxCelsius = tempMaxKelvin - 273.15;
      const tempMaxFahrenheit = (tempMaxCelsius * 9/5) + 32;
      const tempMax = tempMaxFahrenheit.toFixed(1);

      // Min temp kelvin convert to fahrenheit
      const tempMinKelvin = parseFloat(data.list[i].main.temp_min);
      const tempMinCelsius = tempMinKelvin - 273.15;
      const tempMinFahrenheit = (tempMinCelsius * 9/5) + 32;
      const tempMin = tempMinFahrenheit.toFixed(1);

      fiveDayWeather.append(`Temp: ` + tempMax + `° /` + tempMin + `°`);
      fiveDayWeather.append(`Humidity: ` + data.list[i].main.humidity);
      fiveDayWeather.append(`Wind Speed: ` + data.list[i].wind.speed);
    }
  });
}