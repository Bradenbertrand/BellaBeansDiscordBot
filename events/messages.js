//  This file contains the message handlers

//This module is exported to bot.js
//All message response related functions should be run from the messageHandler function

require("../src/bot");

// const https = require('https');
const emojiDBUpdates = require('./EmojiDBUpdates');

let keyword = "-b";

//so really, if messages.js were outside this directory we would require "events" and index.js would be found automatically
let index = require("./index.js");

module.exports = {
    messageHandler: function messageHandler(message) {
        var messageText = message.content.toLowerCase();
        var messageChannel = message.channel;
        console.log(message.content);
        //Scrape for emojis from message, puts them in an array

        // var emojis = message.content.match(/<:.+?:\d+>/g);
        // //if there was an emoji in the message
        // if (emojis != null) {
        //     emojiDBUpdates.emojiParser(emojis);
        // }

        //If message starts with bella or bella beans
        if (messageText.startsWith(keyword)) {
            BellaBeansResponse(message);
        }
    }
}


// 
function BellaBeansResponse(message) {
    if (message.content.startsWith(keyword)){
        const args = message.content.slice(keyword.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();
        let event = index[command];
        if(!event){
            message.reply("I don't know how to do that!");
            return;
        }
        try{
            event.execute(message, args);
        } catch (error) {
            message.reply("There was an error!");
            console.error(error);
        }
    }
}



