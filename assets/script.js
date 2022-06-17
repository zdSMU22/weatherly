// Use moment js to pull today's date + 5 future dates
$(document).ready(function(){
    var momentToday = moment().format("1");
    var day1 = moment().add(1, "days").format("1");
    var day2 = moment().add(2, "days").format("2");
    var day3 = moment().add(3, "days").format("3");
    var day4 = moment().add(4, "days").format("4");
    var day5 = moment().add(5, "days").format("5");

    var cityInput;
    var citiesInput;

// function to take the recently serached cities and convert each city into a JSON string.
    function storeRecentCity(){
        localStorage.setItem('recentCity', cityInput);
        citiesInput.push(citiesInput);
        localStorage.setItem("citiesInput", JSON.stringify(citiesInput))
    }
// function to get the most recently searched city.
    function loadRecentCity(){
        var lastSearched = localStorage.getItem('recentCity');
            if (lastSearched) {
                cityInput = lastSearched;
                searchCity();
            } else {
                city = "Dallas";
                search ();
            }
        }

        loadRecentCity();

// function to get recently searched cities from the JSON string.
    function loadRecentCities(){
        var recentCities = JSON.parse(localStorage.getItem('citiesInput'));
            if (recentCities){
                citiesInput = recentCities;
            } else {
                citiesInput = [];
            }
        } 
        
        loadRecentCities();
    });

var btnSearch = document.querySelector(".btn-search")

//when I click the search button it will take the input, use the api to search for the city, and use that value to create a list of cities searched
btnSearch.addEventListener("click", function(submit){
    console.log("click");
    submit.preventDefault();
    getCityInput();
    searchCity();
    $('city-searched').value("");
    listCities();
});



//the city name is recognized
function getCityInput(){
    var cityInput = document.querySelector(".city-searched").value;
    console.log(cityInput)

    if (cityInput && citiesInput.includes(cityInput) ===false) {
        localStorage.setItem('City');
        return cityInput;
    } else if (!cityInput){
        alert("Invalid city");
    }
};

//After the city name is recognized, then it is used in the weather api
function searchCity (){
    var queryUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + CityInput + "&units=imperial&appid=75ef5305ea3f563128fd1c68bf70ba8a";
    var coordinates = [];

    // Use the get method to request the following infromation from the api that needs to be displayed on the user interface
    $.ajax ({
        url: queryUrl,
        method: "GET",
    }).then(function (response){
        coordinates.push(response.coord.lat);
        coordinates.push(response.coord.lon);
        var cityName = response.name;
        var cityConditions = response.weather[0].decription;
        var cityHumidty = response.main.humidity;
        var cityWind = response.wind.speed;
        var cityTemp = response.main.temp;

        function uvInfo(lat, lon){
            $.ajax
        }

        // Get the elements with a specific id from the html file and insert the concatenate information from the api
        $('#city-name').html(cityName + " " + "(" + momentToday + ")");
        $('#temp').text("Current Temp: " + cityTemp.toFixed(0));
        $('#city-condtions').text("Current conditions: " + cityConditions);
        $('#city-wind').text("Wind Speed: " + cityWind + "mph");
        $('#city-humidity').text("Humidity: " + cityHumidty + "%");
        $('#day1').text(day1);
        $('#day2').text(day2);
        $('#day3').text(day3);
        $('#day4').text(day4);
        $('#day5').text(day5);
    }
}