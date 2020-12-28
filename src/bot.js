require("dotenv").config();
// var mysql = require('mysql');
require("../events/messages")

// Import the discord.js module
const { Client } = require('discord.js');
const messages = require("../events/messages");

// Create an instance of a Discord client
const client = new Client();


// //Auth for database
// var con = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE_ID
//   });

// //Connect to database
// con.connect(function(err) {
//     console.log("Trying to connect");
//     if (err) throw err;
//     console.log('connected')
// });


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('The bot has started!');
    // con.connect
});

// Create an event listener for messages
client.on('message', message => {
    if (message.author.id !== client.user.id) {
        messages.messageHandler(message);
    }
});



client.login(process.env.BBBOT_TOKEN);