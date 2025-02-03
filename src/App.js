import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [cartas, setCartas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCartas, setSelectedCartas] = useState([]);
  const [showList, setShowList] = useState(false);
  const [copias, setCopias] = useState(1); // Nueva variable para las copias
  const [confirmationMessage, setConfirmationMessage] = useState('');
  
  useEffect(() => {
    axios
      .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      .then((response) => {
        setCartas(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las cartas:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCartas = cartas.filter((carta) =>
    carta.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToList = (carta) => {
    setSelectedCartas((prevList) => {
      const cartaExistente = prevList.find((item) => item.id === carta.id);
      if (cartaExistente) {
        cartaExistente.copias += copias;
        return [...prevList];
      } else {
        return [...prevList, { ...carta, copias }];
      }
    });
    setConfirmationMessage(`Se han agregado ${copias} copias de ${carta.name} a la lista.`);
    setTimeout(() => setConfirmationMessage(''), 3000); // Elimina el mensaje después de 3 segundos
  };

  const handleShowList = () => {
    setShowList(!showList);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleChangeCopias = (e) => {
    setCopias(e.target.value);
  };

  
  const generateShareableLink = () => {
    const selectedCartasIds = selectedCartas.map((carta) => carta.id);
    const link = `https://yugioh-card-pricer.com/share?cards=${encodeURIComponent(JSON.stringify(selectedCartasIds))}`;
    navigator.clipboard.writeText(link).then(() => {
      alert(`¡Enlace copiado! Copia y comparte este enlace: ${link}`);
    }).catch((err) => {
      alert('Error al copiar el enlace al portapapeles: ', err);
    });
  };

  return (
    <div className="App">
      <header className="header">

        <h1>Yu-Gi-Oh! Card Pricer</h1>
        <p className="credits">Desarrollado por Gabriel Boetto.</p>
        <h1>Yu-Gi-Oh! Card Pricer2</h1>
        <p className="credits">Desarrollado por Gabriel Boetto</p>

      </header>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar carta..."
          className="search-input"
        />
        <div className="button-container">
          <button className="search-button">Buscar</button>
          <button className="view-list-button" onClick={handleShowList}>
            Ver Lista
          </button>
        </div>
      </div>

      {confirmationMessage && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}

      <div className="card-list">
        {loading ? (
          <p>Cargando cartas...</p>
        ) : filteredCartas.length > 0 ? (
          filteredCartas.map((carta) => (
            <div key={carta.id} className="card-item">
              <img
                src={carta.card_images[0].image_url}
                alt={`Imagen de ${carta.name}`}
                className="card-image"
                loading="lazy"
              />
              <h2>{carta.name}</h2>
              <p>{carta.type}</p>
              <p>Precio: {carta.card_prices[0].card_price}</p>
              
              <div className="quantity-container">
                <label htmlFor="copias">Copias: </label>
                <input
                  type="number"
                  id="copias"
                  min="1"
                  value={copias}
                  onChange={handleChangeCopias}
                  className="copias-input"
                />
              </div>

              <button className="add-to-list-button" onClick={() => handleAddToList(carta)}>
                Agregar a la lista
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron cartas</p>
        )}
      </div>

      {showList && (
        <div className="selected-cards">
          <h2>Cartas Seleccionadas</h2>
          {selectedCartas.length > 0 ? (
            <ul>
              {selectedCartas.map((carta, index) => (
                <li key={index}>
                  <img
                    src={carta.card_images[0].image_url}
                    alt={`Imagen de ${carta.name}`}
                    className="card-thumbnail"
                    loading="lazy"
                  />
                  <div>
                    {carta.name} - Precio: {carta.card_prices[0].card_price} - Copias: {carta.copias}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No has seleccionado ninguna carta.</p>
          )}

          <div className="actions">
            <button onClick={generateShareableLink}>Generar enlace compartible</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
