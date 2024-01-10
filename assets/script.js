console.log("Connected...")

const getCurrent = async (lat, lon) => {
  console.log(`In current ${(lat, lon)}`);
  
  /*
  // onecall API endpoint 
  const onecallAPIresponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=450260ab19cdcec8c8840b4b006ba74a`)
  console.log("API Response: ", onecallAPIresponse)
  const onecallData = await onecallAPIresponse.json();
  console.log("Oncecall Data: ", onecallData)
  */
  // 5 day forecast endpoint 
  const forecastAPIresponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=450260ab19cdcec8c8840b4b006ba74a`)
  console.log("API Response: ", forecastAPIresponse)
  const forecastData = await forecastAPIresponse.json();
  console.log("Forecast Data: ", forecastData)
  console.log("Array Data: ", forecastData.list);
  // from my forecast list data
  for(let i = 0; i < forecastData.list.length; i++) {
    console.log(forecastData.list[i]);
    console.log(forecastData.list[i].dt_txt);  // what is the data at this point(?) --> "2024-01-09 12:00:00" STRING primitive datatype
    // what if we converted A STRING into an ARRAY let tempArr = ["2024-01-09", "12:00:00"] --> tempArr[1]
    // once we have our stat convereted HOW DO WE FILTER OUT the correct data(?)
    console.log(typeof forecastData.list[i].dt_txt);  // what is the data at this point(?) 

  }
  
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=450260ab19cdcec8c8840b4b006ba74a
    `
  );
  // get the body out of the response
  const weather = await response.json();
  ///log the data
  $(".current").append($(`<h1>${weather.name}</h1>`));
  const myImage = $(`<img>`);
  myImage.attr(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  $(".current").append(myImage);
  $(".current").append($(`<p>Temp: ${weather.main.temp}</p>`));
  $(".current").append($(`<p>Wind: ${weather.wind.speed}</p>`));
  $(".current").append($(`<p>Humidity: ${weather.main.humidity}</p>`));
  console.log(weather);
  console.log(weather.name);
  console.log(weather.main.temp);
  console.log(weather.wind.speed);
};

const getCoords = async (city) => {
  console.log(city);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=450260ab19cdcec8c8840b4b006ba74a
    `
  );
  // get the body out of the response
  const data = await response.json();
  // get our values
  const lat = data[0].lat;
  const lon = data[0].lon;

  getCurrent(lat, lon);
  getForecast(lat, lon);
};

//listen for a click
$(".weather_btn").on("click", () => {
    console.log('click');
  // get the value form the form
  $(".current").empty();
  let city = $('.city').val();
  console.log("User Input: ", city);
  // get the coords
  getCoords($(".city").val());
  //pass the coords to the current weather
  // get the weather on th epage
});
