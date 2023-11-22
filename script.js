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
  })
}