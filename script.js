$(document).ready(function () {

    var apiKey = "ef82854d1d438966fb160a6d8e7f319b";


    var cityArr = [];





    // function for curront conditions once city is searched
    function searchWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response)

            // creating an icon based on the weather condition
            var icon = response.weather[0].icon;
            var showIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";


            // based on city searched, current weather displays in container
            var cityName = $("#cityTitle").text(response.name);
            $("#currentWeather").append(cityName);
            var date = $("#date-day").text(moment().format("L"));
            $("#currentWeather").append(date);
            var day = $("#currentDay").text(moment().format('dddd'));
            $("#currentWeather").append(day);
            var cityImage = $("#cityImg").html('<img src="' + showIcon + '"/>');
            $("#currentWeather").append(cityImage);
            var tempF = (response.main.temp).toFixed(0);
            var cityTemp = $("#temperature").text(tempF + " °F")
            $("#currentWeather").append(cityTemp);
            var cityHum = $("#humidity").text(response.main.humidity + " %");
            $("#currentWeather").append(cityHum);
            var cityWind = $("#windSpeed").text(response.wind.speed + " mph");
            $("#currentWeather").append(cityWind);
            var desc = $("#cityDesc").text(response.weather[0].description)
            $("#currentWeather").append(desc);


            // defining long & lat for UV to be displayed 
            var lon = response.coord.lon;
            var lat = response.coord.lat;

            // calling the UV function for it to be displayed 
            UVIndex(lat, lon)
        })






        // creating a UV index based on the long & lat of the city and where the sun is
        function UVIndex(lat, lon) {
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                console.log(response)

                // based on the city the user chooses the UV index will be displayed
                var uvNumber = response.value
                var uv = $("#UV").html("<span class='uvColorBox'>" + uvNumber + "</span>");
                $("#currentWeather").append(uv);

                // creating different colors based on the UV index
                if (uvNumber < 4) {
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
    }





    // function that creates the 5 day weather forecasts and displays it
    function fiveDayWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (forecast) {
            console.log(forecast)

            // for loop that creates the information based on the city chosen
            for (var i = 0; i < forecast.list.length; i += 8) {
                var date = forecast.list[i].dt_txt;
                var formatDate = moment(date).format("ddd");
                var temp = (forecast.list[i].main.temp_max - 273.15) * 1.8 + 32;
                var tempF = (temp.toFixed(0) + " °F")
                var humidity = forecast.list[i].main.humidity;
                var icon = forecast.list[i].weather[0].icon;
                var weatherIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

                // creating the text content to be displayed in each card
                var futureWeather = $('<li class="Day">').html('<i class="day-icon" data-feather="sun"><img src="' + weatherIcon + '" height="50" width="50"/></i>'
                    + '<span class="day-name">' + formatDate + '</span><span class="day-temp">' + tempF + '</span></li>');

                // putting all the information needed in each card
                $(".fiveDay").append(futureWeather)

            }
        })
    }



    // when the search button is clicked, searchWeather function displays   
    $("#select-city").on("click", function (event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();

        
        saveCitySearch(city);
        getSavedCity();
        searchWeather(city);
        $("#fiveDayForecast").html("")
        fiveDayWeather(city);
        clear();
    })
    getSavedCity();



    // saving input to local storage
    function saveCitySearch(city) {
        cityArr.push(city.toLowerCase());
        localStorage.setItem("city", JSON.stringify(cityArr));
    }



    // getting the information from local storage and displaying it
    function getSavedCity() {
        var searchHistory = JSON.parse(localStorage.getItem("city"));

        if (!searchHistory) {
            return null;
        }

        cityArr = searchHistory

        $("#city-div").empty();

        for (var i = 0; i < searchHistory.length; i++) {
            var cityButton = $("<button id='historyBtn'>");
            cityButton.addClass("historyBtn");
            cityButton.attr("data-name", searchHistory[i]);
            cityButton.text(searchHistory[i]);


            $("#city-div").prepend(cityButton);
        }
    }



    // clearing previous data from other cities
    function clear() {
        $("#windSpeed").empty();
        $("#humidity").empty();
        $("#UV").empty();
        $("#temperature").empty();
        $("#cityDesc").empty();
        $(".weather-icon").empty();
        $("#currentDay").empty();
        $("#date-day").empty();
        $("#day-name").empty();
        $("#day-temp").empty();
        $(".fiveDay").empty();
        $("#cityTitle").empty();
        $("#cityTitle").empty();
    }



    // making history buttons pull city info
    $(document).on("click", ".historyBtn", function (event) {

        event.preventDefault();

        clear();

        var clickedCity = $(this).attr("data-name");

        searchWeather(clickedCity)
        $("#fiveDayForecast").html("")
        fiveDayWeather(clickedCity);
    })

});