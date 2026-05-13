import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // show loader

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.cod !== 200) {
          setWeather({ error: "No data found" });
        } else {
          setWeather({
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            condition: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        }
        setLoading(false); // hide loader
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setWeather({ error: "No data found" });
        setLoading(false); // hide loader
      });

    setCity("");
  };

  return (
    <div className="app">
      <h1>Simple Weather App</h1>

      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Loader */}
      {loading && (
        <div className="loading">
          <img
            src="https://i.gifer.com/ZZ5H.gif"
            alt="Loading..."
          />
          <p>Fetching weather data...</p>
        </div>
      )}

      {/* Weather Card */}
      {weather && !loading && (
        <div className="weather-card">
          {weather.error ? (
            <h2>{weather.error}</h2>
          ) : (
            <>
              <h2>
                {weather.city} <span>{weather.country}</span>
              </h2>
              <h1>{weather.temp}°c</h1>
              <div className="icon">
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt={weather.condition}
                />
              </div>
              <p>{weather.condition}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
