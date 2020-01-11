$(document).ready(function(){

    var apiKey = "ef82854d1d438966fb160a6d8e7f319b";

    function searchWeather(city) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response)
        var cityName = $("<button>").html(response.name);
            $("#city-div").append(cityName);
    })
    }
    
    $("#select-city").on("click", function(event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();
    
        searchWeather(city);
    })









});