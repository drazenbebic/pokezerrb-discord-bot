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

// Pokemon

export interface PokemonAbility {
    ability: {
        name: string
        url: string
    }
    is_hidden: boolean
    slot: number
}

export interface PokemonForm {
    name: string
    url: string
}

export interface PokemonVersionDetails {
    rarity: number
    version: {
        name: string
        url: string
    }
}

export interface PokemonHeldItem {
    item: {
        name: string
        url: string
    }
    version_details: Array<PokemonVersionDetails>
}

export interface PokemonVersionGroupDetails {
    level_learned_at: number
    move_learn_method: {
        name: string
        url: string
    }
    version_group: {
        name: string
        url: string
    }
}

export interface PokemonMove {
    move: {
        name: string
        url: string
    }
    version_group_details: Array<PokemonVersionGroupDetails>
}

export interface PokemonGameIndex {
    game_index: number
    version: {
        name: string
        url: string
    }
}

export interface PokemonSprites {
    back_default: string|null
    back_gray: string|null
    back_transparent: string|null
    front_default: string|null
    front_gray: string|null
    front_transparent: string|null
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
    abilities: Array<PokemonAbility>
    base_experience: number
    forms: Array<PokemonForm>
    game_indices: Array<PokemonGameIndex>
    height: number
    held_items: Array<PokemonHeldItem>
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Array<PokemonMove>
    name: string
    order: number
    past_types: Array<any>
    species: {
        name: string
        url: string
    }
    sprites: {
        back_default: string|null
        back_female: string|null
        back_shiny: string|null
        back_shiny_female: string|null
        front_default: string|null
        front_female: string|null
        front_shiny: string|null
        front_shiny_female: string|null
        other: {
            dream_world: {
                front_default: string|null
                front_female: string|null
            }
            home: {
                front_default: string|null
                front_female: string|null
                front_shiny: string|null
                front_shiny_female: string|null
            }
            "official-artwork": {
                font_default: string|null
            }
        }
        versions: {
            "generation-i": {
                "red-blue": PokemonSprites
                yellow: PokemonSprites
            }
            "generation-ii": {}
            "generation-iii": {}
            "generation-iv": {}
            "generation-v": {}
            "generation-vi": {}
            "generation-vii": {}
            "generation-viii": {}
        }
    }
}