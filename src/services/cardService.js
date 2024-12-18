// src/services/cardService.js
import Papa from 'papaparse';

// Función para cargar el archivo CSV
export const cargarCartas = async () => {
  const archivoCSV = '../data/dataCartas.csv';  // Ruta al archivo CSV (debe ser accesible desde el servidor)

  // Utilizamos fetch para obtener el archivo
  const response = await fetch(archivoCSV);
  const textoCSV = await response.text();

  // Usamos PapaParse para procesar el CSV y devolver los datos
  const resultados = Papa.parse(textoCSV, { header: true });
  return resultados.data;  // Devuelve los datos como un array de objetos
};
