function getWeather()   {
    const apiKey = ''
    const city = document.getElementById("city").value;

    if (!city)  {
        alert("Please enter a location")
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('error fetching data', error);
            alert('error fetching data');
        });
}

function displayWeather(data) {
    const tempContainer = document.getElementById('temp-container')
    const weatherDesc = document.getElementById('weather-description')
    const hourlyForecast = document.getElementById('hourly-forecast')
    const weatherIcon = document.getElementById('weather-icon')

    tempContainer.innerHTML = ''
    weatherDesc.innerHTML = ''
    hourlyForecast.innerHTML = ''

    if (data.cod !== 200) {
        tempContainer.innerHTML = `<p>${data.message}</p>`
    } else {

        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempContainer.innerHTML = temperatureHTML;
        weatherDesc.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // showImage();
    }
}