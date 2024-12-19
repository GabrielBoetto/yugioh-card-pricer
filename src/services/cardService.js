export const cargarCartas = async () => {
  const archivoCSV = '/dataCartas.csv';  // Ruta correcta al archivo en la carpeta public
  const response = await fetch(archivoCSV);

  if (!response.ok) {
    console.error('Error al cargar el archivo CSV');
    return [];
  }

  const text = await response.text();
  const rows = text.split('\n');  // Divide las filas
  const cartas = rows.slice(1).map(row => {
    const [name, setName, price] = row.split(',');  // Asume que el CSV tiene estas columnas
    return { name, setName, price };  // Devuelve cada carta como un objeto
  });

  return cartas;
};
