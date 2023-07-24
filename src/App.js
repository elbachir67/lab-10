import React, { useState } from "react";
import "./MyForm.css";

import Meteo from "./Meteo";
function App() {
  const [position, setPosition] = useState({
    longitude: +14.1825,
    latitude: -16.2533,
  });

  // Enregistrer la valeur de la zone de saisie dans l'état lorsqu'elle est modifiée
  const champModifie = event => {
    setPosition({
      ...position,
      [event.target.name]: +event.target.value,
    });
  };

  return (
    <>
      <h1 className="bg-dark text-white display-5">My Weather App</h1>
      <h2 className="bg-dark text-white display-6">Put coordinates</h2>
      <form>
        <label>Longitude :</label>
        <input
          type="text"
          name="longitude"
          onChange={champModifie}
          value={position.longitude}
        />
        <br />
        <label>Latitude :</label>
        <input
          type="text"
          name="latitude"
          onChange={champModifie}
          value={position.latitude}
        />
      </form>
      <Meteo longitude={position.longitude} latitude={position.latitude} />
    </>
  );
}

export default App;
