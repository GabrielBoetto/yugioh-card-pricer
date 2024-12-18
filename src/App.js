import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const initialSearch = prompt('Ingrese el nombre de una carta para buscar:');
    if (initialSearch) {
      searchCards(initialSearch);
    }
  }, []);

  const searchCards = async (term) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cards?name=${term}`);
      setSearchResults(response.data.cards);
      console.log('Resultados encontrados:', response.data.cards);
    } catch (error) {
      console.error('Error al buscar cartas:', error);
    }
  };

  const addCardToList = (card) => {
    setCardList([...cardList, card]);
    alert(`¡Carta añadida a la lista: ${card.name}!`);
  };

  const calculateTotal = () => {
    return cardList.reduce((total, card) => total + (card.price || 0), 0).toFixed(2);
  };

  return (
    <div className="App">
      <h1>Yu-Gi-Oh! Card Pricer</h1>
      
      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar carta"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => searchCards(searchTerm)}>Buscar</button>
      
      {/* Resultados */}
      <ul>
        {searchResults.map((card) => (
          <li key={card.id}>
            {card.name} - ${card.price || 'N/A'}
            <button onClick={() => addCardToList(card)}>Añadir</button>
          </li>
        ))}
      </ul>

      {/* Lista de Cartas */}
      <div id="card-list">
        <h2>Lista de Cartas</h2>
        <ul>
          {cardList.map((card, index) => (
            <li key={index}>
              {card.name} - ${card.price || 'N/A'}
            </li>
          ))}
        </ul>
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
}

export default App;
