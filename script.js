 // Global variables
var searchForm = $("#search-form");
var searchInput = $("#search-input");
var searchHistory = $("#search-history");
var forecast = $("#weather-list");
var submit = $("#submit-button");
var temp = $(".temp");
var date = $(".date");

 // Hold the API key and store city name from user's input
var apiKey = "26969c8a80538530cc05b672bf826665";
var city;

// Get user's city input
submit.on("click", function(event) {
  event.preventDefault();

  var city = searchInput.value;

  if (city) {
    // getWeatherAPI();

    forecast.textContent = '';
    searchInput.value = '';
  }
  else {
    alert('Please enter a valid city name!');
  }
});

function searchHistory(city) {
  var 
}

function getWeatherAPI() {
  // Link the city and apikey to the url
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  
  // // Send an API request to the third party to get weather forecast
  // fetch(queryURL).then(response => response.json())
}
