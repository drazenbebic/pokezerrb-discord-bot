import { Message, Client, Intents } from "discord.js";
import * as yargs from "yargs";
import BotModule from "./bot-module";
import * as dotenv from "dotenv";

dotenv.config();

const Bot = new BotModule();

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
    let evolutions = false;
    let messageToSend;

    // Set the language parameter
    if (argv.lang && typeof argv.lang === 'string' && argv.lang.length === 2) {
        lang = argv.lang.toLowerCase();
    }

    // Set the evolutions parameter
    if (argv.evolutions) {
        evolutions = true;
    }

    if (pokemonName === 'random') {
        // Generates a random number between 1 and 899 (valid pokedex entries).
        const randomId = Math.floor(Math.random() * 899) + 1;
        messageToSend = await Bot.getPokemonByNameOrId(randomId, lang, evolutions);
    } else {
        messageToSend = await Bot.getPokemonByNameOrId(pokemonName, lang, evolutions);
    }

    if (messageToSend) {
        message.channel.send(messageToSend);
    } else {
        message.channel.send("Invalid command or whatever. Try not to mess up next time. Noob. :zerrb:");
    }
});

client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('PokéZerrb logged in.'));