const { Pokedex } = require('./src/pokedex');

const tests = [
  {
    name: 'get charizard - english',
    language: "en",
    input: "charizard",
    expectedOutput: "Charizard"
  },
  {
    name: 'get charizard - german',
    language: "de",
    input: "charizard",
    expectedOutput: "Glurak"
  }, 
];

tests.forEach(t => {
  test(t.name, async () => {
    let lang = t.language;

    const data = await Pokedex.getPokemonSpecies(t.input);

    let name = Pokedex.getPokemonName(data, lang)
    
    expect(name).toBe(t.expectedOutput);
    });
});