


/* ==========================================
        PREMIUM WEATHER DASHBOARD
        script.js
        Part 1
========================================== */

const apiKey = "6d414eb7a30a8630b6a9ed3d005ad027";

/* ==============================
        Elements
============================== */

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherIcon = document.getElementById("weatherIcon");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const forecastContainer =
    document.getElementById("forecastContainer");

const lastUpdated =
    document.getElementById("lastUpdated");

/* ==============================
        Loading
============================== */

function showLoading() {

    loading.style.display = "block";

    error.style.display = "none";

}

function hideLoading() {

    loading.style.display = "none";

}

/* ==============================
        Weather
============================== */

async function getWeather(city) {

    showLoading();

    try {

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        );

        if (!response.ok) {

            throw new Error("City not found");

        }

        const data = await response.json();

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${data.wind.speed} km/h`;

        pressure.textContent =
            `${data.main.pressure} hPa`;

        visibility.textContent =
            `${(data.visibility / 1000).toFixed(1)} km`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        weatherIcon.alt =
            data.weather[0].description;

        sunrise.textContent =

            new Date(
                data.sys.sunrise * 1000
            ).toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit"

            });

        sunset.textContent =

            new Date(
                data.sys.sunset * 1000
            ).toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit"

            });

        lastUpdated.textContent =

            new Date().toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit"

            });

        getForecast(city);

    }

    catch (err) {

        error.style.display = "block";

        error.textContent = err.message;

    }

    finally {

        hideLoading();

    }

}

/* ==========================================
        PREMIUM WEATHER DASHBOARD
        script.js
        Part 2
========================================== */


/* ==============================
        5 DAY FORECAST
============================== */

async function getForecast(city) {

    try {

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

        );


        if (!response.ok) {

            return;

        }


        const data = await response.json();


        forecastContainer.innerHTML = "";


        const dailyData = data.list.filter(item =>

            item.dt_txt.includes("12:00:00")

        );


        dailyData.slice(0, 5).forEach(item => {


            const date = new Date(
                item.dt * 1000
            );


            const day =
                date.toLocaleDateString("en-US", {

                    weekday: "short"

                });


            forecastContainer.innerHTML += `

            <div class="forecast-card">


                <h3>
                    ${day}
                </h3>


                <img 
                src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
                alt="weather">


                <h2>
                    ${Math.round(item.main.temp)}°C
                </h2>


                <p>
                    ${item.weather[0].description}
                </p>


            </div>

            `;


        });


    }

    catch (err) {

        console.log(err);

    }

}





/* ==============================
        SEARCH BUTTON
============================== */


searchBtn.addEventListener(
    "click",
    () => {


        const city =
            cityInput.value.trim();


        if (city !== "") {


            getWeather(city);


        }


    });





/* ==============================
        ENTER KEY SEARCH
============================== */


cityInput.addEventListener(
    "keypress",
    (e) => {


        if (e.key === "Enter") {


            searchBtn.click();


        }


    });





/* ==============================
        CURRENT LOCATION
============================== */


const locationBtn =
    document.getElementById("locationBtn");


if (locationBtn) {


    locationBtn.addEventListener(
        "click",
        () => {


            if (navigator.geolocation) {


                navigator.geolocation.getCurrentPosition(

                    async (position) => {


                        const lat =
                            position.coords.latitude;


                        const lon =
                            position.coords.longitude;



                        try {


                            const response =
                                await fetch(

                                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

                                );


                            const data =
                                await response.json();



                            getWeather(data.name);



                        }


                        catch (error) {


                            console.log(error);


                        }



                    }


                );


            }


        });


}





/* ==============================
        DEFAULT WEATHER
============================== */


window.addEventListener(
    "load",
    () => {


        getWeather("Mumbai");


    });