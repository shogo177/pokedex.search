async function searchPokemon() {
  const input = document.getElementById("pokemonInput");
  input.blur(); // 👈 blur effect
  const nameOrId = input.value.toLowerCase().trim();
  const infoDiv = document.getElementById("pokemonInfo");
  const errorP = document.getElementById("error");

  // Reset
  infoDiv.innerHTML = "";
  errorP.textContent = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error("Pokémon not found.");
    }

    const data = await response.json();

    const pokemonName = data.name.toUpperCase();
    const imageURL = data.sprites.front_default;
    const types = data.types.map(t => t.type.name).join(", "); // Get type(s)

    // Build HTML to display
    infoDiv.innerHTML = `
      <h2>${pokemonName}</h2>
      <img src="${imageURL}" alt="${pokemonName}" />
      <p><strong>Type:</strong> ${types}</p>
    `;
  } catch (error) {
    errorP.textContent = error.message;
  }
}