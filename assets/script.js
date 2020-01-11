$(document).ready(function(){

 apiKey = "ef82854d1d438966fb160a6d8e7f319b";

// pseudo code:
// 1. be able to search for a city
// 2. have the search save to the list below the search
//      in a button where you can reclick it
// 3. when you search for a city have the 5 day forecast 
//      popup with 
// 4. show current and future forecast 
// 5. must include city name, the date, an icon,
//      temp, and humidity
// 6. color cordinate the UV index

let weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=ef82854d1d438966fb160a6d8e7f319b";
let city = "";

$("#history").on("click", function(){
    currentForecast();
    fiveDay();
})

function currentForecast() {
    
}

function fiveDay() {

}

})