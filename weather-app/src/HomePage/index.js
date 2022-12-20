import React, { useEffect, useState } from "react";
import clear from "../assets/clear.avif";
import cloudy from "../assets/cloudy.avif";
import rainy from "../assets/rainy.avif";
import snowy from "../assets/snowy.avif";
import "./index.scss";
import axios from "axios";

export const HomePage = () => {
  
  const [weatherData, setWeatherData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState("Tenkasi");
  const [backgroundUrl, setBackgroundUrl] = useState(cloudy);
  const [weatherIcons, setWeatherIcons] = useState("");

  const currentDate = new Date();
  const climate = weatherData[0]?.weather[0].main;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=47ee553c24c84e3521f9d5268d5dbf68`;

  useEffect(() => {
    async function getWeatherData() {
      const apiData = await axios.get(weatherUrl);
      setWeatherData([apiData.data]);

      const listOfIcons = [
        "fa-sharp fa-solid fa-cloud",
        "fa-sharp fa-solid fa-cloud-rain",
        "fa-sharp fa-solid fa-cloud-sun",
        "fa-sharp fa-solid fa-cloud-fog",
      ];
      if (climate === "Clouds" || climate === "Smoke") {
        setBackgroundUrl(cloudy);
        setWeatherIcons(listOfIcons[0]);
      }
      if (climate === "Rain") {
        setBackgroundUrl(rainy);
        setWeatherIcons(listOfIcons[1]);
      }
      if (climate === "Clear") {
        setBackgroundUrl(clear);
        setWeatherIcons(listOfIcons[2]);
      }
      if (climate === "Haze" || climate === "Mist") {
        setBackgroundUrl(snowy);
        setWeatherIcons(listOfIcons[3]);
      }
    }
    getWeatherData();
  }, [weatherUrl, climate]);

  const handleCityName = (event) => {
    setCityName(event.target.value);
  };

  const handleSearch = () => {
    setLocation(cityName);
    setCityName("");
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundUrl})`,
    height: "100vh",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    display: "flex",
  };

  return (
    <section>
      {weatherData?.map((data, index) => (
        <div style={backgroundStyle} key={index}>
          <div className="view-weather-table">
            <div className="view-weather-details">
              <table className="weather-deg">
                <tbody>
                  <tr>
                    <td>
                       <h1> {Math.round(data.wind.deg / 10)} <sup>o</sup></h1>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="weather-location">
                <tbody>
                  <tr>
                    <td>
                      <h3>{data.name}</h3>
                    </td>
                    <td>
                      <i className={weatherIcons}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        {`${currentDate.getHours()}:${currentDate.getMinutes()} PM`}
                      </span>
                      <span>
                        {`${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`}
                      </span>
                    </td>
                    <td>
                      {data.weather[0].main}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="weather-main-table">
            <div className="search-location">
              <input
                placeholder="Search Location..."
                onChange={handleCityName}
                value={cityName}
              />
              <button onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <table className="weather-details">
              <thead>
                <tr>
                  <td>Weather Details</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.weather[0].main}</td>
                  <td>{Math.round(data.wind.deg / 10)}%</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{data.main.humidity}%</td>
                </tr>
                <tr>
                  <td>Wind Speed</td>
                  <td>{data.wind.speed} km/hr</td>
                </tr>
              </tbody>
            </table>

            <div>
              <h4>Description</h4>
              <span>- {data.weather[0].description}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
