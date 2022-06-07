
export interface FlavorTextEntry {
    flavor_text: string
    language: {
        name: string
        url: string
    }
    version: {
        name: string
        url: string
    }
}

// Pokemon Species

export interface PokemonSpeciesEggGroup {
    name: string
    url: string
}

export interface PokemonSpeciesGenera {
    genus: string
    language: {
        name: string
        url: string
    }
}

export interface PokemonSpeciesName {
    language: {
        name: string
        url: string
    }
    name: string
}

export interface PokemonSpeciesPokedexNumbers {
    entry_number: number
    pokedex: {
        name: string
        url: string
    }
}

export interface PokemonSpeciesVarieties {
    is_default: boolean
    pokemon: {
        name: string
        url: string
    }
}

// Endpoints

export interface PokemonSpecies {
    base_happiness: number
    capture_rate: number
    color: {
        name: string
        url: string
    }
    egg_groups: Array<PokemonSpeciesEggGroup>
    evolution_chain: {
        url: string
    }
    evolves_from_species: null | {
        name: string
        url: string
    }
    flavor_text_entries: Array<FlavorTextEntry>
    form_descriptions: Array<any>
    forms_switchable: boolean
    gender_rate: number
    genera: Array<PokemonSpeciesGenera>
    generation: {
        name: string
        url: string
    }
    growth_rate: {
        name: string
        url: string
    }
    habitat: {
        name: string
        url: string
    }
    has_gender_differences: false
    hatch_counter: number
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    names: Array<PokemonSpeciesName>
    order: number
    pal_park_encounters: Array<string>
    pokedex_numbers: Array<PokemonSpeciesPokedexNumbers>
    shape: {
        name: string
        url: string
    }
    varieties: Array<PokemonSpeciesVarieties>
}

export interface Pokemon {

}