// var geoApiUrl = 'https://api.openweatehrmap.org/data/2.5/onecall?q=${search}&limit=5&appid=75ef5305ea3f563128fd1c68bf70ba8a';
var btnSearch = document.querySelector(".btn-search")


//when I click the search button for a city
btnSearch.addEventListener("click", function(){
    console.log("click");

    getCityInput()
});

//the city name is recognized
function getCityInput(){
    var cityInput = document.querySelector(".city-searched").value;
    console.log(cityInput)
}

//After the city name is recognized, then it is used in the weather api
