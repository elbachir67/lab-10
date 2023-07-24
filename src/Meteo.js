import React, { useState } from "react";
import "./Meteo.css";
function Meteo({ longitude, latitude }) {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [main, setMain] = useState("");
  const [desc, setDesc] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  const [icon, setIcon] = useState("");
  const [isReady, setReady] = useState(false);
  React.useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${longitude}&lon=${latitude}&appid=485eaae13c44dca81805beb5cfe0e7b3&units=metric`
    )
      .then(result => result.json())
      .then(jsonresult => {
        setCity(jsonresult.name);
        setTemp(jsonresult.main.temp);
        setMain(jsonresult.weather[0].main);
        setDesc(jsonresult.weather[0].description);
        setIcon(jsonresult.weather[0].icon);
        setSunrise(jsonresult.sys.sunrise);
        setSunset(jsonresult.sys.sunset);
        setReady(true);
      })
      .catch(err => console.error(err));
  }, [longitude, latitude]);
  if (isReady) {
    const dateset = new Date(sunrise * 1000);
    let hours =
      dateset.getUTCHours() < 10
        ? "0" + dateset.getUTCHours()
        : dateset.getUTCHours();

    let minutes =
      dateset.getUTCMinutes() < 10
        ? "0" + dateset.getUTCMinutes()
        : dateset.getUTCMinutes();
    let secondes =
      dateset.getUTCSeconds() < 10
        ? "0" + dateset.getUTCSeconds()
        : dateset.getUTCSeconds();

    const datetimeset = hours + ":" + minutes + ":" + secondes;

    const daterise = new Date(sunset * 1000);
    hours =
      daterise.getUTCHours() < 10
        ? "0" + daterise.getUTCHours()
        : daterise.getUTCHours();
    minutes =
      daterise.getUTCMinutes() < 10
        ? "0" + daterise.getUTCMinutes()
        : daterise.getUTCMinutes();
    secondes =
      daterise.getUTCSeconds() < 10
        ? "0" + daterise.getUTCSeconds()
        : daterise.getUTCSeconds();
    const datetimerise = hours + ":" + minutes + ":" + secondes;
    const theme =
      temp < 0
        ? "primary"
        : temp < 20
        ? "info"
        : temp < 30
        ? "success"
        : "danger";

    const classe = `alert alert-${theme}`;

    return (
      <dl className={classe}>
        <dt>City</dt>
        <dd>{city} </dd>
        <dt>Temperature</dt>
        <dd>{temp} °C</dd>
        <dt>Main</dt>
        <dd>{main}</dd>
        <dt>Description</dt>
        <dd>{desc}</dd>
        <dt>Illustration</dt>
        <dd>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Weather icon"
          />
        </dd>
        <dt>Sunrise </dt>
        <dd>{datetimeset} </dd>
        <dt>Sunset </dt>
        <dd>{datetimerise} </dd>
      </dl>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default Meteo;

// london : 51.5085, -0.1257
