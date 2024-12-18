import React, { useState } from 'react';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [cards, setCards] = useState([]);
    const [total, setTotal] = useState(0);

    const buscarCarta = async () => {
        if (!query) return; // Si no hay texto, no hace nada

        try {
            const response = await fetch(`https://api.tcgplayer.com/.../cards?name=${query}`);
            const data = await response.json();

            if (data && data.price) {
                setCards([...cards, { name: query, price: data.price }]);
                setTotal(total + data.price);
            } else {
                alert('Carta no encontrada.');
            }
        } catch (error) {
            console.error('Error al buscar carta:', error);
        }
    };

    return (
        <div className="container">
            <h1>Yu-Gi-Oh! Card Pricer</h1>
            <div>
                <input
                    type="text"
                    placeholder="Buscar carta"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={buscarCarta}>Buscar</button>
            </div>
            <h2>Lista de Cartas</h2>
            <ul>
                {cards.map((card, index) => (
                    <li key={index}>{card.name} - ${card.price.toFixed(2)}</li>
                ))}
            </ul>
            <div className="total">Total: ${total.toFixed(2)}</div>
        </div>
    );
}

export default App;
