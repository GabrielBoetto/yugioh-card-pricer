// Obtener el contenedor de cartas y el formulario
const cardsContainer = document.getElementById("cards-container");
const cardForm = document.getElementById("card-form");
const selectedCardsList = document.getElementById("selected-cards-list");

// URL de la API de Scryfall para obtener las cartas de Yu-Gi-Oh!
const apiURL = 'https://api.scryfall.com/cards/search?q=game%3Ayu-gi-oh!';

// Cargar las cartas desde la API de Scryfall
fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        if (data && data.data && Array.isArray(data.data)) {
            data.data.forEach(card => {
                // Crear la tarjeta en el contenedor de cartas
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card");
                cardDiv.innerHTML = `
                    <img src="${card.image_uris ? card.image_uris.normal : ''}" alt="${card.name}">
                    <p>${card.name}</p>
                    <p>Precio: $${card.prices.tcgplayer}</p>
                `;
                cardsContainer.appendChild(cardDiv);

                // Crear un checkbox para cada carta en el formulario
                const cardCheckbox = document.createElement("input");
                cardCheckbox.type = "checkbox";
                cardCheckbox.id = card.id;
                cardCheckbox.name = "cards";
                cardCheckbox.value = card.name;
                const label = document.createElement("label");
                label.setAttribute("for", card.id);
                label.innerText = card.name;

                // Agregar los elementos al formulario
                cardForm.appendChild(label);
                cardForm.appendChild(cardCheckbox);
                cardForm.appendChild(document.createElement("br"));
            });
        } else {
            console.error("No se encontraron cartas en el formato esperado.");
        }
    })
    .catch(error => console.error("Error al cargar las cartas:", error));

// Función para agregar las cartas seleccionadas a la lista
document.getElementById("add-cards-btn").addEventListener("click", function () {
    // Obtener los checkboxes seleccionados
    const selectedCards = document.querySelectorAll('input[name="cards"]:checked');

    // Limpiar la lista actual
    selectedCardsList.innerHTML = "";

    // Recorrer los checkboxes seleccionados y agregar las cartas a la lista
    selectedCards.forEach(function (checkbox) {
        const listItem = document.createElement("li");
        listItem.textContent = checkbox.value;
        selectedCardsList.appendChild(listItem);
    });

    // Si no se seleccionaron cartas
    if (selectedCards.length === 0) {
        const noSelection = document.createElement("li");
        noSelection.textContent = "No has seleccionado ninguna carta.";
        selectedCardsList.appendChild(noSelection);
    }
});
