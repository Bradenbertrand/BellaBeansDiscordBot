require("dotenv").config();

// Import the discord.js module
const { Client } = require('discord.js');

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
    console.log(message.content)
        // If the message is "bella"
    if (message.content.toLowerCase === 'bella') {
        // Send "pong" to the same channel
        message.channel.send('Beans');
    }

    if (message.content.toLowerCase === 'beans') {
        message.channel.send('Bonstruction')
    }
});

client.login(process.env.BBBOT_TOKEN);