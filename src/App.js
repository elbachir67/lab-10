import React, { useState } from "react";
import "./App.css";
function App() {
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
      "https://api.openweathermap.org/data/2.5/weather?lat=14.6937&lon=-17.4441&appid=485eaae13c44dca81805beb5cfe0e7b3&units=metric"
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
  }, []);
  if (isReady) {
    const dateset = new Date(sunrise * 1000);
    const hours =
      dateset.getUTCHours() < 10
        ? "0" + dateset.getUTCHours()
        : dateset.getUTCHours();
    const datetimeset =
      hours + ":" + dateset.getUTCMinutes() + ":" + dateset.getUTCSeconds();

    const daterise = new Date(sunset * 1000);
    const hours2 =
      daterise.getUTCHours() < 10
        ? "0" + daterise.getUTCHours()
        : daterise.getUTCHours();
    const datetimerise =
      hours2 + ":" + daterise.getUTCMinutes() + ":" + daterise.getUTCSeconds();

    return (
      <dl className="App alert alert-success">
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

export default App;
