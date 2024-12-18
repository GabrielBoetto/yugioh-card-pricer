// src/components/SearchForm.js
import React, { useState } from 'react';

const SearchForm = ({ onBuscarCarta }) => {
  const [nombreCarta, setNombreCarta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscarCarta(nombreCarta);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombreCarta">Nombre de la carta:</label>
      <input
        type="text"
        id="nombreCarta"
        value={nombreCarta}
        onChange={(e) => setNombreCarta(e.target.value)}
        placeholder="Ej. Blue-Eyes White Dragon"
        required
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;
