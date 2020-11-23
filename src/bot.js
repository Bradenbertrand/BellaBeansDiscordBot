require("dotenv").config();

const { Client } = require('discord.js');
const client = new Client();

client.login(process.env.BBBOT_TOKEN);





