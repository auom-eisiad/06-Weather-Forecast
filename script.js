 // Global variables
var searchForm = $("#search-form");
var searchInput = $("#search-input");
var searchHistory = $("#search-history");
var forecast = $("#weather-forecast");
var submit = $("#submit-button");

 // Hold the API key and store city name from user's input
 var apiKey = "26969c8a80538530cc05b672bf826665";
 var city;
 
 function getAPI() {
  
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  
  // fetch(queryURL).then(function(response) {
  //   if(response.ok) {
  //     response
  //   }
  // });
  
}

submit.on('click', function(event) {
  event.preventDefault();
  console.log("click");
})