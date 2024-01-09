import { useState } from "react";
import { handleFetch } from "./data/data";

export const WheaterApp = () => {
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "cfd4f49541a6a1b8fe9a0a7052e92664";
  const DegreesKelvin = 273.15;

  const [InputData, setInputData] = useState("");
  const [dataWeather, setDataWeather] = useState(null);

  const getInputData = (e) => {
    setInputData(e.target.value);
  };

  const handleOnSubmit = async (e) => 
  {
    e.preventDefault();

    if (InputData.length > 0) {
      try {

        const newDataWeather = await handleFetch(url, InputData, API_KEY);

        if (newDataWeather !== null) {
          setDataWeather(newDataWeather);
        }
        else
        {
            return;
        }

      } catch (error) {
        console.error("se ha producido un error " + error);
        return null;
      }
    }
  };

  return (
    <div className="container">
      <h1>Aplicación de clima</h1>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="Ingrese provincia o ciudad" type="text" value={InputData} onChange={getInputData} />
        <button type="submit">Buscar</button>
      </form>
      {dataWeather && (
        <div>
          <h2>{dataWeather.name}</h2>
          <p>
            Temperatura: {parseInt(dataWeather.main.temp - DegreesKelvin)}°C
          </p>
          <p>Condición Meteorológica: {dataWeather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};
