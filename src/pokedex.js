const axios = require('axios');

class Pokedex {
    baseUrl = 'https://pokeapi.co/api/v2';

    async getPokemonSpecies(nameOrId) {
        const axiosResponse = await axios.get( this.baseUrl + '/pokemon-species/' + nameOrId);
        return axiosResponse.data;
    }

    async getPokemon(nameOrId) {
        const axiosResponse = await axios.get( this.baseUrl + '/pokemon/' + nameOrId);
        return axiosResponse.data;
    }

    getPokemonName(pokemonSpecies, lang = 'en') {
        let name;

        const validNameObjects = pokemonSpecies.names.filter(nameObject => {
            return nameObject.language.name === lang;
        });

        if (validNameObjects && validNameObjects.length === 1) {
            name = validNameObjects[0].name;
        }

        return name;
    }

    getPokemonFlavorText(pokemonSpecies, lang = 'en') {
        const validFlavorTextEntries = pokemonSpecies.flavor_text_entries.filter(flavorTextEntry => {
            return flavorTextEntry.language.name === lang;
        });

        return validFlavorTextEntries[Math.floor(Math.random() * validFlavorTextEntries.length)].flavor_text;
    }
}

exports.Pokedex = new Pokedex();