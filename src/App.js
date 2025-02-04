import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [cartas, setCartas] = useState([]);
  const [selectedCartas, setSelectedCartas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [copias, setCopias] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then((response) => {
        setCartas(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
      });
  }, []);

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  const handleAddToList = (carta) => {
    setSelectedCartas((prevList) => {
      const cartaExistente = prevList.find((item) => item.id === carta.id);
      if (cartaExistente) {
        return prevList.map((item) =>
          item.id === carta.id ? { ...item, copias: item.copias + copias } : item
        );
      } else {
        return [...prevList, { ...carta, copias }];
      }
    });

    setConfirmationMessage(`Se han agregado ${copias} copias de ${carta.name} a la lista.`);
    setTimeout(() => setConfirmationMessage(""), 3000);
  };

  const filteredCartas = cartas.filter((carta) =>
    carta.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Yu-Gi-Oh! Card Pricer</h1>
        <p className="credits">Desarrollado por Gabriel Boetto.</p>
      </header>
      <input
        type="text"
        placeholder="Buscar carta..."
        value={busqueda}
        onChange={handleSearch}
      />
      <ul className="card-list">
        {filteredCartas.map((carta) => (
          <li key={carta.id} className="card">
            <img src={carta.card_images[0].image_url} alt={carta.name} />
            <h3>{carta.name}</h3>
            <p>Precio: {carta.card_prices?.[0]?.card_price || "No disponible"}</p>
            <input
              type="number"
              min="1"
              value={copias}
              onChange={(e) => setCopias(Number(e.target.value))}
            />
            <button onClick={() => handleAddToList(carta)}>Añadir a lista</button>
          </li>
        ))}
      </ul>
      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
      <h2>Lista de Cartas Seleccionadas</h2>
      <ul className="selected-list">
        {selectedCartas.map((carta) => (
          <li key={carta.id} className="selected-card">
            <img src={carta.card_images[0].image_url} alt={carta.name} />
            <h3>{carta.name} (x{carta.copias})</h3>
            <p>Precio: {carta.card_prices?.[0]?.card_price || "No disponible"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
