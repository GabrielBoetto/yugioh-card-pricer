import React, { useState, useEffect } from 'react';
import { cargarCartas } from './services/cardService';
import CardResult from './components/CardResult';

const App = () => {
  const [cartas, setCartas] = useState([]);
  const [cartaEncontrada, setCartaEncontrada] = useState(null);
  const [nombreCarta, setNombreCarta] = useState('');

  useEffect(() => {
    // Cargar cartas al inicio
    const fetchCartas = async () => {
      const cartasCargadas = await cargarCartas();
      setCartas(cartasCargadas);
    };
    fetchCartas();
  }, []);

  const buscarCarta = (nombreCarta) => {
    if (!nombreCarta || typeof nombreCarta !== 'string') {
      console.log('El nombre de la carta no es válido');
      return; // Salir de la función si no es válido
    }

    const carta = cartas.find(carta =>
      carta.name && carta.name.toLowerCase().includes(nombreCarta.toLowerCase())
    );

    if (!carta) {
      console.log('Carta no encontrada');
      setCartaEncontrada(null); // No encontró carta
    } else {
      setCartaEncontrada(carta); // Carta encontrada
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar carta"
        value={nombreCarta}
        onChange={(e) => setNombreCarta(e.target.value)}
      />
      <button onClick={() => buscarCarta(nombreCarta)}>Buscar</button>

      {cartaEncontrada && <CardResult carta={cartaEncontrada} />}
    </div>
  );
};

export default App;
