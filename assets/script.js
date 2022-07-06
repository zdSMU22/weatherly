// Global variables
var searchHistory = [];
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = '75ef5305ea3f563128fd1c68bf70ba8a';

    // Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//Other global variables
    var cityInput = document.getElementsByClassName("city-searched").value;
    var citiesInput;

// function to take the recently searched cities and convert each city into a JSON string.
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
                // search();
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

        var btnSearch = document.querySelector(".btn-search")




//the city name is recognized
function getCityInput(){
    cityInput = $("#city-searched").val();
    console.log("cityInput")

    if (cityInput && citiesInput.includes(cityInput) ===false) {
        storeRecentCity();
        return cityInput;
    } else if (!cityInput){
        alert("Invalid city");
    }
};

//After the city name is recognized, then it is used in the weather api
function searchCity (){
    var queryUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + CityInput + "&units=imperial&appid=${weatherApiKey}";
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
        var icon = response.weather[0].icon;
            $("#icon").html(
        `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
        );
        
                // Get the elements with a specific id from the html file and insert the concatenate information from the api
                $('#city-name').append(cityName + " " + "(" + momentToday + ")");
                $('#temp').text("Current Temp: " + cityTemp.toFixed(0));
                $('#city-condtions').text("Current conditions: " + cityConditions);
                $('#city-wind').text("Wind Speed: " + cityWind + "mph");
                $('#city-humidity').text("Humidity: " + cityHumidty + "%");
                $('#day1').text(day1);
                $('#day2').text(day2);
                $('#day3').text(day3);
                $('#day4').text(day4);
                $('#day5').text(day5);

                uvInfo(response.coord.lat, response.coord.lon);
                }).fail(function (){
                alert("Could not get data")
                });

        function uvInfo(lat, lon){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=75ef5305ea3f563128fd1c68bf70ba8a",
                method: "GET",
            }).then(function (response){

                var uvInfo = response.current.uvi;
                $("#city-uv-index").text("UV Index:" + " " + uvInfo);
                if (uvInfo >= 8){
                    $("#city-uv-index").css("color", "red");
                }else if (uvInfo > 4 && uvInfo < 8){
                    $("#city-uv-index").css("color", "yellow");
                } else {
                $("#city-uv-index").css("color", "green");
        }
        var cityMax = response.daily[0].temp.max;
        $("#high").text("Expected high:" + " " + cityMax);

        //forecast information for temperature, conditions, wind, humidity, icons
        var temp1 = repsonse.daily[1].temp.max;
        var temp2 = repsonse.daily[2].temp.max;
        var temp3 = repsonse.daily[3].temp.max;
        var temp4 = repsonse.daily[4].temp.max;
        var temp5 = repsonse.daily[5].temp.max;

        $("#temp1").text("Temp:" + " " +temp1.toFixed(1));
        $("#temp2").text("Temp:" + " " +temp2.toFixed(1));
        $("#temp3").text("Temp:" + " " +temp3.toFixed(1));
        $("#temp4").text("Temp:" + " " +temp4.toFixed(1));
        $("#temp5").text("Temp:" + " " +temp5.toFixed(1));

        // var conditions1 = response.daily[1].cityConditions;

        var wind1 = repsonse.daily[1].wind;
        var wind2 = repsonse.daily[2].wind;
        var wind3 = repsonse.daily[3].wind;
        var wind4 = repsonse.daily[4].wind;
        var wind5 = repsonse.daily[5].wind;

        $("#wind1").text("Wind:" + " " +wind1.toFixed(1));
        $("#wind2").text("Wind:" + " " +wind2.toFixed(1));
        $("#wind3").text("Wind:" + " " +wind3.toFixed(1));
        $("#wind4").text("Wind:" + " " +wind4.toFixed(1));
        $("#wind5").text("Wind:" + " " +wind5.toFixed(1));

        var humidity1 = response.daily[1].humidity;
        var humidity2 = response.daily[2].humidity;
        var humidity3 = response.daily[3].humidity;
        var humidity4 = response.daily[4].humidity;
        var humidity5 = response.daily[5].humidity;

        $("#humidity1").text("Humidity:" + " " +humidity1.toFixed(1));
        $("#humidity2").text("Humidity:" + " " +humidity2.toFixed(1));
        $("#humidity3").text("Humidity:" + " " +humidity3.toFixed(1));
        $("#humidity4").text("Humidity:" + " " +humidity4.toFixed(1));
        $("#humidity5").text("Humidity:" + " " +humidity5.toFixed(1));

        var icon1 = response.daily[1].weather[0].icon;
        var icon2 = response.daily[2].weather[0].icon;
        var icon3 = response.daily[3].weather[0].icon;
        var icon4 = response.daily[4].weather[0].icon;
        var icon5 = response.daily[5].weather[0].icon;

        $("#icon1").html(
            `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
          );
          $("#icon2").html(
            `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
          );
          $("#icon3").html(
            `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
          );
          $("#icon4").html(
            `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
          );
          $("#icon5").html(
            `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
          );
          
         });
        }
    }

// DOM element references
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');


// Function to display the search history list.
function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';

  // Start at end of history array and count down to show the most recent at the top.
  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn-history');

    // `data-search` allows access to city name when click handler is invoked
    btn.setAttribute('data-search', searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);
  }
}

// Function to update history in local storage then updates displayed history.
function appendToHistory(search) {
  // If there is no search term return the function
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);

  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  renderSearchHistory();
}

// Function to get search history from local storage
function initSearchHistory() {
  var storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}

// Function to display the current weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather, timezone) {
  var date = dayjs().tz(timezone).format('M/D/YYYY');

  // Store response data from our fetch request in variables
  var tempF = weather.temp;
  var windMph = weather.wind_speed;
  var humidity = weather.humidity;
  var uvi = weather.uvi;
  var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  var iconDescription = weather.weather[0].description || weather[0].main;

  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var heading = document.createElement('h2');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');
  var uvEl = document.createElement('p');
  var uviBadge = document.createElement('button');

  card.setAttribute('class', 'card');
  cardBody.setAttribute('class', 'card-body');
  card.append(cardBody);

  heading.setAttribute('class', 'h3 card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

  heading.textContent = `${city} (${date})`;
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${tempF}°F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  cardBody.append(heading, tempEl, windEl, humidityEl);

  uvEl.textContent = 'UV Index: ';
  uviBadge.classList.add('btn', 'btn-sm');

  if (uvi < 3) {
    uviBadge.classList.add('btn-success');
  } else if (uvi < 7) {
    uviBadge.classList.add('btn-warning');
  } else {
    uviBadge.classList.add('btn-danger');
  }

  uviBadge.textContent = uvi;
  uvEl.append(uviBadge);
  cardBody.append(uvEl);

  todayContainer.innerHTML = '';
  todayContainer.append(card);
}

// Function to display a forecast card given an object from open weather api
// daily forecast.
function renderForecastCard(forecast, timezone) {
  // variables for data from api
  var unixTs = forecast.dt;
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
  var iconDescription = forecast.weather[0].description;
  var tempF = forecast.temp.day;
  var { humidity } = forecast;
  var windMph = forecast.wind_speed;

  // Create elements for a card
  var col = document.createElement('div');
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h5');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute('class', 'col-md');
  col.classList.add('five-day-card');
  card.setAttribute('class', 'card bg-primary h-100 text-white');
  cardBody.setAttribute('class', 'card-body p-2');
  cardTitle.setAttribute('class', 'card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

  // Add content to elements
  cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format('M/D/YYYY');
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(col);
}

// Function to display 5 day forecast.
function renderForecast(dailyForecast, timezone) {
  // Create unix timestamps for start and end of 5 day forecast
  var startDt = dayjs().tz(timezone).add(1, 'day').startOf('day').unix();
  var endDt = dayjs().tz(timezone).add(6, 'day').startOf('day').unix();

  var headingCol = document.createElement('div');
  var heading = document.createElement('h4');

  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);

  forecastContainer.innerHTML = '';
  forecastContainer.append(headingCol);
  for (var i = 0; i < dailyForecast.length; i++) {
    // The api returns forecast data which may include 12pm on the same day and
    // always includes the next 7 days. The api documentation does not provide
    // information on the behavior for including the same day. Results may have
    // 7 or 8 items.
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
      renderForecastCard(dailyForecast[i], timezone);
    }
  }
}

function renderItems(city, data) {
  renderCurrentWeather(city, data.current, data.timezone);
  renderForecast(data.daily, data.timezone);
}

// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.
function fetchWeather(location) {
  var { lat } = location;
  var { lon } = location;
  var city = location.name;
  var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
  var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('Location not found');
      } else {
        appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function handleSearchFormSubmit(e) {
  // Don't continue if there is nothing in the search form
  if (!searchInput.value) {
    return;
  }

  e.preventDefault();
  var search = searchInput.value.trim();
  fetchCoords(search);
  searchInput.value = '';
}

function handleSearchHistoryClick(e) {
  // Don't do search if current elements is not a search history button
  if (!e.target.matches('.btn-history')) {
    return;
  }

  var btn = e.target;
  var search = btn.getAttribute('data-search');
  fetchCoords(search);
}

initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);