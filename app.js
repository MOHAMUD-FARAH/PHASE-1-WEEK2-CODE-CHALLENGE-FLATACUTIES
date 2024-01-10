document.addEventListener('DOMContentLoaded', () => {
  const animalsList = document.getElementById('animals-list');
  const animalDetails = document.getElementById('animal-details');
  const apiUrl = 'http://localhost:3000/characters';

  // Fetch all animals
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => renderAnimals(data.characters))
    .catch(error => console.error('Error fetching data:', error));

  // Render animals list
  function renderAnimals(animals) {
    animalsList.innerHTML = animals.map(animal => `
      <div>
        <p onclick="showAnimalDetails(${animal.id})">${animal.name}</p>
      </div>
    `).join('');
  }

  // Show animal details when clicked
  window.showAnimalDetails = (id) => {
    fetch(`${apiUrl}/${id}`)
      .then(response => response.json())
      .then(animal => renderAnimalDetails(animal))
      .catch(error => console.error('Error fetching animal details:', error));
  };

  // Render animal details
  function renderAnimalDetails(animal) {
    animalDetails.innerHTML = `
      <div>
        <h2>${animal.name}</h2>
        <img src="${animal.image}" alt="${animal.name}" />
        <p>Votes: ${animal.votes}</p>
        <button onclick="addVote(${animal.id})">Vote</button>
      </div>
    `;
  }

  // Add votes to an animal
  window.addVote = (id) => {
    // Simulate adding votes (no persistence)
    fetch(`${apiUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ votes: Math.floor(Math.random() * 10) + 1 }),
    })
      .then(response => response.json())
      .then(animal => {
        // Update displayed votes
        const votesElement = document.querySelector(`#animal-details [data-id="${id}"] p`);
        if (votesElement) votesElement.textContent = `Votes: ${animal.votes}`;
      })
      .catch(error => console.error('Error adding vote:', error));
  };
});
