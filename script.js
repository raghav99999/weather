const weather = {
    apiKey: "a2636bbda93a96e6f0a952dad9b73a0b",
    apiBase: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector(".searchBox");
searchBox.addEventListener('keypress',setQuery);

let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener("click", resultOnClick);

function resultOnClick(){
    resultOnEnter(searchBox.value);
    searchBox.value='';
};

function setQuery(event){
    if(event.keyCode == 13){
        resultOnEnter(searchBox.value);
        searchBox.value='';
    }
}

function resultOnEnter(city){
    fetch(`${weather.apiBase}weather?q=${city}&units=metric&appid=${weather.apiKey}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${weather.weather[0].description}')`;

    let city = document.querySelector('.weather-data h2');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let now = new Date();
    let dateTime = document.querySelector('.weather-data .date-time');
    dateTime.innerText = dateBuilder(now, weather);

    let dayNight = document.querySelector('.weather-data .day-night');
    dayNight.innerHTML = `Day ${Math.round(weather.main.temp_max)}°&uarr; &vellip; Night ${Math.round(weather.main.temp_min)}°&darr;`;

    let temp = document.querySelector('.weather-data .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}°<span>C</span>`;

    let feelsLike = document.querySelector('.weather-data .feels-like');
    feelsLike.innerText = `Feels Like ${Math.round(weather.main.feels_like)}°`;

    let icon = document.querySelector('.icon img');
    icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    let description = document.querySelector('.description');
    description.innerText = `${weather.weather[0].description}`;

}



function dateBuilder(d, weather){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let time = calcTime(searchBox.value , weather.timezone);
    return `${date} ${month}, ${time}`;
}

function calcTime(place, offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (1000*offset));
    return `${nd.getHours()}:${nd.getMinutes()}`;
}

