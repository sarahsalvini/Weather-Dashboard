$(document).ready(function(){

    var apiKey = "ef82854d1d438966fb160a6d8e7f319b";






function searchWeather(city) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response)
// when user searches for a city, button is created below search box
        var history = $("<button id='historyBtn'>").html(response.name);
            $("#city-div").append(history);

        var icon = response.weather[0].icon;
        var showIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        
// based on city searched, current weather displays in container
        var cityName = $("#cityTitle").text(response.name + " " + "(" + moment().format("L") + ")");
            $("#currentWeather").append(cityName);
        var cityImage = $("#cityImg").html('<img src="' + showIcon + '"/>');
            $("#currentWeather").append(cityImage);
        var tempF = (response.main.temp); 
        var cityTemp = $("#temperature").text("Temperature: " + tempF + " °F")
            $("#currentWeather").append(cityTemp);
        var cityHum = $("#humidity").text("Humidity: " + response.main.humidity + " %");
            $("#currentWeather").append(cityHum);
        var cityWind = $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#currentWeather").append(cityWind);

        var lon = response.coord.lon;
        var lat = response.coord.lat;

        UVIndex(lat, lon)

})
}



function UVIndex(lat, lon) {
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey +"&lat=" + lat + "&lon=" + lon;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response)

        var uvNumber = response.value
      var uv = $("#UV").html("UV Index: " +  "<span class='uvColorBox'>" + uvNumber + "</span>");
      $("#currentWeather").append(uv);


      if (uvNumber < 4){
        $(".uvColorBox").css({
            "background-color": "lightgreen",
        });
      } else if (uvNumber >= 5 && uvNumber <= 7) {
        $(".uvColorBox").css({
            "background-color": "yellow",
        });
      } else {
        $(".uvColorBox").css({
            "background-color": "red",
        });
      }

    })
}




function fiveDayWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(forecast){
        console.log(forecast)

        for (var i = 0; i < forecast.list.length; i+= 8) {
            var date = forecast.list[i].dt_txt;
            var formatDate = moment(date).format("L");
            var temp = (forecast.list[i].main.temp_max - 273.15) * 1.8 + 32;
            var humidity = forecast.list[i].main.humidity;
            var icon = forecast.list[i].weather[0].icon;
            var weatherIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            var futureWeather = $('<div class="card bg-light ml-0 mb-3 mr-3" style="min-width: 100px;">').html('<div class="card-body">'
                 + '<h6 class="card-title" id="date">' + formatDate + "</h6>" 
                 + '<img src="' + weatherIcon + '"/>' 
                 + '<div class="card-text" id="temp-humidity">' 
                 + "Temperature: " + temp.toFixed(2) + "°F" 
                 + "<br>" 
                 + "Humidity: " + humidity + "%" 
                 + "</div>" + "</div>" + "</div>");


            $("#fiveDayForecast").append(futureWeather)
        }
        

    })
}




// when the search button is clicked, searchWeather function displays   
$("#select-city").on("click", function(event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();

        searchWeather(city);
        fiveDayWeather(city);
        UVIndex(city)
    })







});