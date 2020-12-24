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
        const args = message.content.slice(keyword.length).trim().split(" ");
        const command = args.shift().toLowerCase();
        try {
            index[command].execute(message, args);
        } catch (error) {
            // console.error(error);
            message.reply("I don't know how to do that!");
        }
    }
}

// Sleep function for async delay
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// Sends a message, then edits itself to write out BBB
async function bellaSelfEdit(message, channel) {
    //Send "bella"
    channel.send(':b:ella').then(async(sentMessage) => {
        //Wait 1 second
        await sleep(900);
        //Edit the message to "Beans"
        sentMessage.edit(":b:ella :b:eans").then(async(sentMessage) => {
            //Wait 1 second
            await sleep(900);
            //Edit the message to "Bonstruction"
            sentMessage.edit(":b:ella :b:eans :b:onstruction");
        });
    });
}


function purge(message){
    let args = message.content.split(" ").slice(2);
    let amount;

    console.log("Command is purge.");
    console.log("Arguments: [" + args + "]");

    // Checking for valid # of arguments
    if(args.length > 1){
        message.channel.send(":flushed: Invalid invoke of purge command! :flushed:\n**TRY** `bella purge (# of messages to purge)`");
        return;
    }

    // Checking for valid arguments.
    if(args.length === 0){
        amount == 1;
    } else if(isNaN(args[0]) || Number(args[0]) < 0){
        message.channel.send(":flushed: Invalid invoke of purge command! Feed me positive integers pwease! :flushed:\n**TRY** `bella purge (# of messages to purge)`");
        return;
    } else {
        amount = Number(args[0]);
    }

    // Checking for # of messages to delete.
    if(amount > 100){
        message.channel.send(":flushed: Invalid invoke of purge command! I canz only delete 100 messages at a time! :flushed:\n**TRY** `bella purge (# of messages to purge)`");
        return;
    }

    message.channel.bulkDelete(amount + 1);
}