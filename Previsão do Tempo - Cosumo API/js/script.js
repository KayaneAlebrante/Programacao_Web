const apiKey = "e39b5688bc0c636048453adf9822d0d4";

const cityInput = document.querySelector('#city-input');
const searchBt = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    if (!city) {
        console.error("Nome da cidade está vazio");
        return;
    }

    try {
        const data = await getWeatherData(city);

        if (data.cod !== 200) {
            console.error(`Erro da API OpenWeather: ${data.message}`);
            return;
        }

        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

        const countryData = await axios.get(`https://restcountries.com/v3.1/alpha/${data.sys.country}`);
        const flagURL = countryData.data[0].flags.svg;

        countryElement.setAttribute("src", flagURL);

        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed} Km/h`;

        console.log(data);

        weatherContainer.classList.remove("hide");
    } catch (error) {
        console.error("Erro ao buscar dados climáticos:", error);
    }
}


// Eventos
searchBt.addEventListener("click", (event) => {
    event.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});
