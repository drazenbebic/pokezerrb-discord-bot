import { Message, Client, Intents } from "discord.js";
import * as yargs from "yargs";
import PokedexModule from "./pokedex-module";
import PokedexInterface from "./interfaces/pokedex-interface";
import * as dotenv from "dotenv";

dotenv.config();

const Pokedex: PokedexInterface = new PokedexModule();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => {
    console.log('PokéZerrb ready.');
});

client.on('messageCreate', async (message: Message) => {
    // Abort early if the bot wasn't mentioned directly.
    if (!client || !client.user || !message.mentions.has(client.user.id)) {
        return;
    }

    // Clean the user input.
    const mention = /<@(.*?)>/;
    const cleanString = message.content
        .replace(mention, '')
        .replace(' ', '')
        .toLowerCase()
        .split(' ');

    const argv = await yargs(cleanString).argv;
    const pokemonName = argv._[0];

    let lang = 'en';
    let evolvesFrom;
    let evolvesFromName;

    // Set the language parameter
    if (argv.lang && typeof argv.lang === 'string' && argv.lang.length === 2) {
        lang = argv.lang.toLowerCase();
    }

    let pokemonSpecies = await Pokedex.getPokemonSpecies(pokemonName);

    if (!pokemonSpecies) {
        message.channel.send("Couldn't find that pokemon.");
        return;
    }

    let pokemon = await Pokedex.getPokemon(pokemonName);

    if (!pokemon) {
        message.channel.send("Couldn't find that pokemon.");
        return;
    }

    // Retrieve the name
    let name = Pokedex.getPokemonName(pokemonSpecies, lang);

    // Retrieve the flavor text
    let flavorText = Pokedex.getPokemonFlavorText(pokemonSpecies, lang);

    // Check for evolutions
    if (argv.evolutions && typeof argv.evolutions === 'boolean') {
        if (pokemonSpecies.evolves_from_species) {
            try {
                evolvesFrom = await Pokedex.getPokemonSpecies(pokemonSpecies.evolves_from_species.name);

                if (evolvesFrom) {
                    evolvesFromName = Pokedex.getPokemonName(evolvesFrom, lang);
                }
            } catch (error) {
                message.channel.send("Couldn't find that pokemon.");
                return;
            }
        }
    }

    let messageToSend = "**" + name + "**";

    if (flavorText) {
        messageToSend += ''
            + "\n"
            + "*-- Description --*"
            + "\n"
            + flavorText
            + "\n";
    }

    if (evolvesFrom) {
        messageToSend += ''
            + "\n"
            + "*-- Evolution Chain --*"
            + "\n"
            + evolvesFromName + ' | '
            + '**' + name + '**' + ' | '
    }

    message.channel.send(messageToSend);
});

client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('PokéZerrb logged in.'));