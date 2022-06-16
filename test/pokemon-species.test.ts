import PokedexInterface from "../src/interfaces/pokedex-interface";
import PokedexModule from "../src/pokedex-module";

const tests = [
  {
    name: 'Pokemon Species - Charizard - English',
    language: "en",
    input: "Charizard",
    expectedOutput: "Charizard"
  },
  {
    name: 'Pokemon Species - Charizard - German',
    language: "de",
    input: "Charizard",
    expectedOutput: "Glurak"
  },
  {
    name: 'Pokemon Species - Charizard - French',
    language: 'fr',
    input: 'Charizard',
    expectedOutput: 'Dracaufeu'
  }
];

tests.forEach(t => {
  test(t.name, async () => {
    let lang = t.language;

    const Pokedex: PokedexInterface = new PokedexModule();
    const data = await Pokedex.getPokemonSpecies(t.input);

    if (data) {
      let name = Pokedex.getPokemonName(data, lang)

      expect(name).toBe(t.expectedOutput);
    }
  });
});
