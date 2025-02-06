// Función para buscar carta
function buscarCarta() {
    let cardName = document.getElementById('card-name').value.trim();
  
    if (cardName === '') {
      alert('Por favor, ingresa el nombre de una carta.');
      return;
    }
  
    // Simulación de búsqueda de cartas
    const cards = [
      { name: 'Black Lotus', price: '$5000', image: 'https://via.placeholder.com/150' },
      { name: 'Shivan Dragon', price: '$10', image: 'https://via.placeholder.com/150' },
      { name: 'Lightning Bolt', price: '$1', image: 'https://via.placeholder.com/150' },
      { name: 'Forest', price: '$2', image: 'https://via.placeholder.com/150' },
    ];
  
    // Filtrar las cartas según el nombre (insensible a mayúsculas/minúsculas)
    const foundCard = cards.filter(card => card.name.toLowerCase().includes(cardName.toLowerCase()));
  
    if (foundCard.length > 0) {
      mostrarCartas(foundCard);
    } else {
      alert('No se encontraron cartas con ese nombre.');
    }
  }
  
  // Función para mostrar las cartas encontradas
  function mostrarCartas(cards) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Limpiar cartas anteriores
  
    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.name}">
        <p>${card.name}</p>
        <p>Precio: ${card.price}</p>
        <input type="number" min="1" value="1" id="quantity-${card.name}" />
        <button onclick="agregarCarta('${card.name}')">Agregar a la lista</button>
      `;
      cardsContainer.appendChild(cardElement);
    });
  }
  