 // Global variables
var searchInput = $("#search-input");
var submit = $("#submit-button");

// Hold the API key and store city name from user's input
var apiKey = "26969c8a80538530cc05b672bf826665";
var city;

submit.on("click", function(event) {
  event.preventDefault();

  city = searchInput.val().trim();

  if (city === "") {
    alert("Please enter a city/ state!");
  } else {
    searchHistory(city);
    getCityCoord();
    getWeatherAPI();
    fiveDay();
  }
});

function searchHistory() {
  const cityHistory = JSON.parse(localStorage.getItem("cities")) || [];

  if (!cityHistory.some((item) => item.city === city)) {
    cityHistory.push({ city: city });
    localStorage.setItem("cities", JSON.stringify(cityHistory));
  }

  var searchHistory = $(".lastCities");
  searchHistory.empty();

  for (i = 0; i < cityHistory.length; i++) {
    var btn = document.createElement("button");
    btn.classList.add("savedBtn", "p-3", "m-3", "text-centered", "text-uppercase");
    btn.textContent = `${cityHistory[i].city}`;
    searchHistory.append(btn);
  }
}

function clickHistory() {
  $(document).on("click", ".savedBtn", function(event) {
    event.preventDefault();
    var citySaved = $(this).text();

    searchInput.val(citySaved);
    
    searchHistory();
    getCityCoord();
    getWeatherAPI();
    fiveDay();
  });

  clickHistory();
}

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
    // console.log(data);
    $(".weatherToday").removeClass("d-none");
    $(".cityName").text(city);

    // Clear the prev weather report so it doesn't continue to loop/ add on
    $(".weather").empty();

    var currentTime = dayjs().format('YYYY-MM-DD');
    $(".cityName").append(" (" + currentTime + ")").css("color", "#5691b3");
    
    var weatherIcon = $("<img/>")
    weatherIcon.attr("src", `http://openweathermap.org/img/wn/` + data.list[0].weather[0].icon + `.png`);
    $(".cityName").append(weatherIcon);

    var box = document.createElement("div");
    box.classList.add("displayToday", "m-3");

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

    var temp = $("<p>").text(`Temp: ${tempMax}° / ${tempMin}°`);
    var humid = $("<p>").text(`Humidity: ${data.list[0].main.humidity}%`);
    var windspd = $("<p>").text(`Wind Speed: ${data.list[0].wind.speed} m/s`);

    // Append elements to the box
    $(box).append(temp, humid, windspd);
    $(".weather").append(box);
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
    // console.log(data);
    $(".weatherForecast").removeClass("d-none");
    var fiveDayDisplay = $(".forecast5day");

    // Clear the prev weather report so it doesn't continue to loop/ add on
    fiveDayDisplay.empty();

    // Loop through the weather data for the next 5 days
    for (var i = 1; i < 6; i++) {
      var box = document.createElement("div");
      box.classList.add("display5day" + i, "col-2", "m-2");

      // Weather information
      var fiveDayweatherURL = `http://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png`;

      const tempMaxKelvin = parseFloat(data.list[i].main.temp_max);
      const tempMaxCelsius = tempMaxKelvin - 273.15;
      const tempMaxFahrenheit = (tempMaxCelsius * 9/5) + 32;
      const tempMax = tempMaxFahrenheit.toFixed(1);

      const tempMinKelvin = parseFloat(data.list[i].main.temp_min);
      const tempMinCelsius = tempMinKelvin - 273.15;
      const tempMinFahrenheit = (tempMinCelsius * 9/5) + 32;
      const tempMin = tempMinFahrenheit.toFixed(1);

      var date = document.createElement("p");
      // var unixDate = `${data.list[i].dt}`;
      // date.textContent = dayjs.unix(unixDate).format("MM/DD/YYYY");

      var icon = document.createElement("img");
      icon.src = fiveDayweatherURL;
      icon.alt = "5 Day Weather Icons";
      
      var currentTime = dayjs().format('YYYY-MM-DD');
      var newDate = dayjs(currentTime).add(i, 'day');
      var formattedDate = newDate.format('YYYY-MM-DD');
      date.textContent = `${formattedDate}`;
      date.style.color = "#5691b3";

      var temp = document.createElement("p");
      temp.textContent = `Temp: ${tempMax}° / ${tempMin}°`;

      var humid = document.createElement("p");
      humid.textContent = `Humidity: ${data.list[i].main.humidity}%`;

      var windspd = document.createElement("p");
      windspd.textContent = `Wind Speed: ${data.list[i].wind.speed} m/s`;

      // Append weather info to the forecast display
      box.append(icon, date, temp, humid, windspd);
      fiveDayDisplay.append(box);
    }
  });
}

clickHistory();