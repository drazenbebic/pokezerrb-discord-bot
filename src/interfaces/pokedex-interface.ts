import {Pokemon, PokemonSpecies} from "./poke-api";

export default interface PokedexInterface {
    getPokemonSpecies(nameOrId: string|number): Promise<PokemonSpecies|undefined>
    getPokemon(nameOrId: string|number): Promise<Pokemon|undefined>
    getPokemonName(pokemonSpecies: PokemonSpecies, lang: string): string|undefined
    getPokemonFlavorText(pokemonSpecies: PokemonSpecies, lang: string): string|undefined
}