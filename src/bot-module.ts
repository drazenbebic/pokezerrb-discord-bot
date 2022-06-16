import PokedexModule from "./pokedex-module";
import PokedexInterface from "./interfaces/pokedex-interface";

export default class BotModule {
    pokedex: PokedexInterface;

    constructor() {
        this.pokedex = new PokedexModule();
    }

    async getRandomPokemon(number: number, lang: string, evolutions: boolean) {
        return this.getPokemonByNameOrId(number, lang, evolutions);
    }

    async getPokemonByNameOrId(nameOrId: string|number, lang: string, evolutions: boolean): Promise<string> {
        let evolvesFrom;
        let evolvesFromName;

        let pokemonSpecies = await this.pokedex.getPokemonSpecies(nameOrId);

        if (!pokemonSpecies) {
            return "Couldn't find that pokemon.";
        }

        let pokemon = await this.pokedex.getPokemon(nameOrId);

        if (!pokemon) {
            return "Couldn't find that pokemon.";
        }

        // Retrieve the name
        let name = this.pokedex.getPokemonName(pokemonSpecies, lang);

        // Retrieve the flavor text
        let flavorText = this.pokedex.getPokemonFlavorText(pokemonSpecies, lang);

        // Check for evolutions
        if (evolutions) {
            if (pokemonSpecies.evolves_from_species) {
                try {
                    evolvesFrom = await this.pokedex.getPokemonSpecies(pokemonSpecies.evolves_from_species.name);

                    if (evolvesFrom) {
                        evolvesFromName = this.pokedex.getPokemonName(evolvesFrom, lang);
                    }
                } catch (error) {
                    return "Couldn't find that pokemon.";
                }
            }
        }

        let message = "**#" + pokemon.id + " - "  + name + "**";

        if (flavorText) {
            message += ''
                + "\n"
                + "*-- Description --*"
                + "\n"
                + flavorText
                + "\n";
        }

        if (evolvesFrom) {
            message += ''
                + "\n"
                + "*-- Evolution Chain --*"
                + "\n"
                + evolvesFromName + ' | '
                + '**' + name + '**' + ' | '
        }

        return message;
    }
}