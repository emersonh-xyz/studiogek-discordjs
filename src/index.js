require("dotenv").config();
const { token, guildId } = process.env;
const { Client, Collection, GatewayIntentBits, Partials, Events } = require("discord.js");
const path = require("path")
const fs = require("fs")

// Load our Discord Intents
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel, Reaction } = Partials;

// Locate our commands path
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const functionsPath = path.join(__dirname, 'functions');
const functionFiles = fs.readdirSync(functionsPath).filter(file => file.endsWith('.js'))


const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember, Channel, Reaction]
});

// Create a new commands collection
client.commands = new Collection();

// Filter each file in our commands directory
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Filter each file in our events directory
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    console.log(event);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Filter each file in our functions directory
for (const file of functionFiles) {
    require(`./functions/${file}`)(client)
}


// Login to our client
client
    .login(token)
    .catch(err => console.log(err));
