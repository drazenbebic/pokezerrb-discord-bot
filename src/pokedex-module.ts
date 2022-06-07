import { Pokemon, PokemonSpeciesName, PokemonSpecies, FlavorTextEntry } from "./interfaces/poke-api";
import PokedexInterface from "./interfaces/pokedex-interface";
import axios from "axios";

export default class PokedexModule implements PokedexInterface {
    baseUrl = 'https://pokeapi.co/api/v2';

    async getPokemonSpecies(nameOrId: string|number): Promise<PokemonSpecies|undefined> {
        try {
            const axiosResponse = await axios.get( this.baseUrl + '/pokemon-species/' + nameOrId);
            return axiosResponse.data;
        } catch (error: any) {
            //console.error(error);
            return undefined;
        }
    }

    async getPokemon(nameOrId: string|number): Promise<Pokemon|undefined> {
        try {
            const axiosResponse = await axios.get( this.baseUrl + '/pokemon/' + nameOrId);
            return axiosResponse.data;
        } catch (error: any) {
            //console.error(error);
            return undefined;
        }
    }

    getPokemonName(pokemonSpecies: PokemonSpecies, lang: string = 'en'): string|undefined {
        let name;

        const validNameObjects: Array<PokemonSpeciesName> = pokemonSpecies.names.filter((pokemonSpeciesName) => {
            return pokemonSpeciesName.language.name === lang;
        });

        if (validNameObjects && validNameObjects.length === 1) {
            name = validNameObjects[0].name;
        }

        return name;
    }

    getPokemonFlavorText(pokemonSpecies: PokemonSpecies, lang: string = 'en'): string|undefined {
        const flavorTexts: Array<FlavorTextEntry> = pokemonSpecies.flavor_text_entries.filter(flavorTextEntry => {
            return flavorTextEntry.language.name === lang;
        });

        if (!flavorTexts || flavorTexts.length === 0) {
            return undefined;
        }

        return flavorTexts[Math.floor(Math.random() * flavorTexts.length)].flavor_text;
    }
}