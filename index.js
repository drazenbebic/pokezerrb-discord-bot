const { Client, Intents } = require('discord.js');
const yargs = require('yargs/yargs');
const { Pokedex } = require('./src/pokedex');
require('dotenv').config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => {
    console.log('PokéZerrb ready.');
});

client.on('messageCreate', async (message) => {
    // Abort early if the bot wasn't mentioned directly.
    if (!message.mentions.has(client.user.id)) {
        return;
    }

    // Clean the user input.
    const mention = /<@(.*?)>/;
    const cleanString = message.content
        .replace(mention, '')
        .replace(' ', '')
        .toLowerCase();

    const argv        = yargs(cleanString).argv;
    const pokemonName = argv._[0];

    let pokemon;
    let pokemonSpecies;
    let flavorText;
    let sprite;
    let lang = 'en';
    let name;
    let evolvesFrom;
    let evolvesFromName;

    // Set the language parameter
    if (argv.lang && argv.lang.length === 2) {
        lang = argv.lang.toLowerCase();
    }

    try {
        pokemonSpecies = await Pokedex.getPokemonSpecies(pokemonName);
    } catch (error) {
        message.channel.send("Couldn't find that pokemon.");
        return;
    }

    try {
        pokemon = await Pokedex.getPokemon(pokemonName);
    } catch (error) {
        message.channel.send("Couldn't find that pokemon.");
        return;
    }

    // Add the sprite
    if (pokemon.sprites.front_default) {
        sprite = pokemon.sprites.front_default;
    }

    // Retrieve the name
    name = Pokedex.getPokemonName(pokemonSpecies, lang);

    // Add flavor text
    flavorText = Pokedex.getPokemonFlavorText(pokemonSpecies, lang);

    // Check for evolutions
    if (argv.evolutions || argv.e) {
        if (pokemonSpecies.evolves_from_species) {
            try {
                evolvesFrom = await Pokedex.getPokemonSpecies(pokemonSpecies.evolves_from_species.name);
            } catch (error) {
                message.channel.send("Couldn't find that pokemon.");
                return;
            }

            evolvesFromName = Pokedex.getPokemonName(evolvesFrom, lang);
        }
    }

    let messageToSend = ''
        + "**" + name + "**"
        + "\n"
        + "*-- Description --*"
        + "\n"
        + flavorText
        + "\n";

    if (evolvesFrom) {
        messageToSend += ''
            + "*-- Evolution Chain --*"
            + "\n"
            + evolvesFromName + ' | '
            + '**' + name + '**' + ' | '
    }

    message.channel.send(messageToSend);
});

client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('PokéZerrb logged in.'));