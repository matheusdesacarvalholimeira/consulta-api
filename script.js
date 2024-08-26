document.getElementById('search-btn').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const pokemonInfo = document.getElementById('pokemon-info');
    const errorMessage = document.getElementById('error-message');
    
    if (pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            // Exibe as informações do Pokémon
            document.getElementById('pokemon-title').innerText = data.name.toUpperCase();
            document.getElementById('pokemon-img').src = data.sprites.front_default;
            document.getElementById('pokemon-height').innerText = `${data.height} decimetres`;
            document.getElementById('pokemon-experience').innerText = data.base_experience;
            
            const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
            document.getElementById('pokemon-abilities').innerText = abilities;

            pokemonInfo.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        })
        .catch(error => {
            pokemonInfo.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        });
    }
});
