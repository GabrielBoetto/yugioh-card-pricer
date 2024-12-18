import axios from 'axios';

const BASE_URL = 'https://www.tcgplayer.com/api'; // Configurar con tu API de TCGPlayer

export const searchCards = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/cards?name=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};
