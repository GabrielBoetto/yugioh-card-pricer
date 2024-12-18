// src/components/CardResult.js
import React from 'react';

const CardResult = ({ carta }) => {
  console.log('Carta en CardResult:', carta);  // Verifica los datos que llegan al componente

  if (!carta) {
    return <p>Carta no encontrada.</p>;
  }

  return (
    <div className="card-result">
      <h3>{carta.name}</h3>
      <p><strong>Expansión:</strong> {carta.setName}</p>
      <p><strong>Precio estimado:</strong> ${carta.price}</p>
    </div>
  );
};

export default CardResult;
