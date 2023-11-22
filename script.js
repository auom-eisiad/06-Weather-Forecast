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

  getWeatherAPI();
});

function getWeatherAPI() {
  // Link the city and apikey to the url
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  // console.log(queryURL);
  
  // Send an API request to the third party to get city longitude and latitude
  fetch(queryURL)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    const cityData = {
      city: city,
      lat: data.coord.lat,
      lon: data.coord.lon
    }
    
    // console.log(cityData);
    return cityData;
  });
}
