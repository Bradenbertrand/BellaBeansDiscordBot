require("dotenv").config();

require("../events/messages")

// Import the discord.js module
const { Client } = require('discord.js');
const messages = require("../events/messages");

// Create an instance of a Discord client
const client = new Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('Im starting!');
});

// Create an event listener for messages
client.on('message', message => {
    if (message.content.substring(0, 2) === "b!")
        messages.messageHandler(message);
});

client.login(process.env.BBBOT_TOKEN);