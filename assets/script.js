$(document).ready(function(){

    var apiKey = "ef82854d1d438966fb160a6d8e7f319b";

    function searchWeather(city) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response)
        var history = $("<button>").html(response.name);
            $("#city-div").append(history);

        var cityName = $("#cityTitle").text(response.name);
            $("#currentWeather").append(cityName);
        var cityTemp = $("#temperature").text("Temperature: " + response.main.temp);
            $("#currentWeather").append(cityTemp);
        var cityHum = $("#humidity").text("Humidity: " + response.main.humidity + " %");
            $("#currentWeather").append(cityHum);
        var cityWind = $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#currentWeather").append(cityWind);
        var cityUV = $("#UV").text("UV Index: ");
            $("#currentWeather").append(cityUV);
    })
    }
    
    $("#select-city").on("click", function(event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();


        searchWeather(city);
    })





    // name
    // temp: 
    //     main.temp
    
    // humidity: 
    //     main.humidity
    
    // wind speed:
    //     wind.speed
    
    // UV Index:


});