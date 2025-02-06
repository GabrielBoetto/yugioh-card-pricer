// Función para buscar cartas
async function buscarCarta() {
    const query = document.getElementById('card-name').value;
  
    if (!query) {
      alert('Por favor, ingresa el nombre de una carta.');
      return;
    }
  
    try {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
      const data = await response.json();
  
      // Limpiar resultados anteriores
      const cardsContainer = document.getElementById('cards-container');
      cardsContainer.innerHTML = '';
  
      // Verificar si no se encontraron cartas
      if (data.total_cards === 0) {
        alert('No se encontraron cartas con ese nombre.');
        return;
      }
  
      // Mostrar cartas encontradas
      data.data.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        const cardImage = document.createElement('img');
        cardImage.src = card.image_uris ? card.image_uris.small : 'https://via.placeholder.com/150';
  
        const cardTitle = document.createElement('h3');
        cardTitle.textContent = card.name;
  
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.min = 1;
        quantityInput.id = `quantity-${card.id}`;
        
        const addButton = document.createElement('button');
        addButton.textContent = 'Añadir a la lista';
        addButton.onclick = () => agregarCarta(card, quantityInput.value);
  
        cardElement.appendChild(cardImage);
        cardElement.appendChild(cardTitle);
        cardElement.appendChild(quantityInput);
        cardElement.appendChild(addButton);
  
        cardsContainer.appendChild(cardElement);
      });
    } catch (error) {
      alert('Esa carta no existe.');
    }
  }
  
  // Función para añadir carta a la lista
  function agregarCarta(card, quantity) {
    const quantityNumber = parseInt(quantity);
  
    if (quantityNumber <= 0) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }
  
    // Agregar carta a la lista
    const selectedCardsList = document.getElementById('selected-cards-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${card.name} x${quantityNumber}`;
  
    selectedCardsList.appendChild(listItem);
  
    // Mostrar alerta de confirmación
    alert(`Se añadió ${card.name} x${quantityNumber} a tu lista.`);
    
    // Actualizar el precio total
    actualizarPrecioTotal(card, quantityNumber);
  }
  
  // Función para calcular el precio total
  function actualizarPrecioTotal(card, quantityNumber) {
    const totalPrice = document.getElementById('total-price');
    const selectedCardsList = document.getElementById('selected-cards-list').children;
  
    let total = 0;
  
    // Calcular el precio total de las cartas seleccionadas
    Array.from(selectedCardsList).forEach((item) => {
      // Reemplazar con el precio real de la carta obtenida de la API
      total += parseFloat(card.price); // Utilizando el precio de la carta real de la API
    });
  
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Función para ir a la lista de cartas
  function verLista() {
    const createListSection = document.getElementById('create-list-section');
    createListSection.scrollIntoView({ behavior: 'smooth' });
}
