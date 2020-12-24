//  This file contains the message handlers

//This module is exported to bot.js
//All message response related functions should be run from the messageHandler function

require("../src/bot");
const https = require('https');
const emojiDBUpdates = require('./EmojiDBUpdates');

module.exports = {
    messageHandler: function messageHandler(message) {
        //Conditional statements to determine if message was meant for bot
        var messageText = message.content.toLowerCase();
        var messageChannel = message.channel;
        //Scrape for emojis from message
        var emojis = message.content.match(/<:.+?:\d+>/g);
        //if there was an emoji in the message
        if (emojis != null) {
            emojiDBUpdates.emojiParser(emojis);
        }
        //If message starts with bella or bella beans
        if (messageText.startsWith("bella")) {
            BellaBeansResponse(message);
        } else {
            //Do Nothing if message wasnt meant for me :(
        }

    }
}


// 
function BellaBeansResponse(message) {
    // If the message is "bella"
    if (message.content.toLowerCase() === 'bella') {
        // Send "I heard my name!" to the same channel
        message.channel.send('I heard my name!');
        // If the message is 'beans'
    } else if (message.content.toLowerCase().startsWith("bella who is")) {
        parseCommand(message); //more like handle command
    } else if (message.content.toLowerCase().startsWith("bella motto")) {
        bellaSelfEdit(message.content.toLowerCase(), message.channel);
    } else if (message.content.toLowerCase().startsWith("bella help")) {
        message.channel.send("Here are the possible commands\nBella Help\nBella who is (person)\nBella Motto\nBella Leaderboard")
    } else if (message.content.toLowerCase().startsWith("bella leaderboard")) {
        emojiDBUpdates.getEmojiLeaderboard(message);
    } else if(message.content.toLowerCase().startsWith("bella purge")){
        purge(message);
    } else if(message.content.toLowerCase().startsWith("bella react")){
        react(message);
    } else {
        message.channel.send("I dont know that command! type Bella Help for a list of commands.")
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


function parseCommand(message) {
    let command = message.content.toLowerCase().substring(6);
    //find out more about a person
    // console.log(command);
    if (message.content.toLowerCase() == "bella who is") {
        message.channel.send("Enter the name of the person you'd like me to search up")
        return;
    }
    if (command.toLowerCase().startsWith("who is")) {
        findPerson(message, command);
    }
}

function findPerson(message, command) {
    console.log("Finding person:");
    //probably bad practice to just count out how long the command is lol
    let person = fixName(command.substring(7));
    console.log(person);

    //wikipedia json formatted data
    let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + person;
    https.get(url, function(response) {
        let data = "";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            //grab the first two sentences about the person
            //not perfect, what if a period is used say with a term like jr.
            let pages = JSON.parse(data).query.pages;
            // console.log(pages);
            let about = "";
            for (property in pages) {
                if (pages[property].hasOwnProperty("pageid")) {
                    about = pages[property].extract;
                }
            }
            about = about.split(". ");
            let res = about[0] + ".\n\n" + about[1] + ".";
            //why tf doesn't this work? it says res is undefined???
            if (res.startsWith(".") && res.endsWith("undefined.")) {
                console.log("Finding person failed")
                message.channel.send("Sorry, I couldn't find them!")
            } else {
                message.channel.send(res);
            }
        });
    }).on("error", function(error) {
        message.channel.send("Sorry, I couldn't find them! Error: " + error);
    })
}


function fixName(name) {
    name = name.split(" ");
    let fullName = "";
    //each part of the name (first ~~middle~~ last etc)
    for (let part of name) {
        //each char in the string
        for (let j = 0; j < part.length; j++) {
            //capitalise first letter
            if (j === 0) {
                fullName += part.charAt(j).toUpperCase();
            }
            //lowercase following letters
            else {
                fullName += part.charAt(j).toLowerCase();
            }
            part.charAt(j);
        }
        fullName += " ";
    }
    return fullName;
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
        amount = 1;
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

    console.log("Amount to delete: " + amount);

    message.channel.bulkDelete(amount + 1)
        .catch(console.error);
}

async function react(message){
    // Parse the user command.
    let args = message.content.split(" ").slice(2);
    console.log("Message: " + message.content);
    console.log("Arguments: [" + args + "]");

    // Check if command arguments are valid.
    if(args.length > 1){
        message.channel.send(":flushed: Invalid invoke of react command! :flushed:\n**TRY** `bella react (word to react with)`");
        return;
    } else if (args.length === 0){
        message.channel.send(":flushed: Invalid invoke of react command! :flushed:\n**TRY** `bella react (word to react with)`");
        return;
    }

    // Store the word the user wants to react with in a string.
    let string = args[0];

    // Check if the string is a valid heterogram.
    if(isHeterogram(string)){
        // String is a valid heterogram we can react with.

        // Fetch the message to react to. (the most recent message not including the invoke of command message)
        const fetched_msgs = await message.channel.messages.fetch({ limit: 2}); // returns promise type
        let fetched_arr = fetched_msgs.array(); // convert promise type to array of message objects
        let msg_to_react_to = fetched_arr[fetched_arr.length - 1]; // Get the message object to react to.

        // React to the message.
        addReactions(string, msg_to_react_to)
    
    } else {
        // Message is not a valid heterogram to react with. Send error message and return.
        message.channel.send("The word `" + string + "` is NOT a valid heterogram!\nWord must be a heterogram and cannot contain numbers or be longer than 20 characters!\n**TRY** `bella react (word to react with)`");
        return;
    }
    
}

// Helper function 
// reacts to the given mesage with the given heterogram string characters using the characters correspoding unicode emoji.
function addReactions(string, msg){

    // Get the json object of the unicode emojis for each letter in the alphabet.
    let unicodeMap = require("./../data/unicode_map.json");

    // Iterate over each character in the heterogram and react with each character.
    for(let char in string){
        msg.react(unicodeMap[string[char]]);
    }

}

// Helper function for determining if a string is a heterogram
// Heterogram is a word which each character in the word only appears once. (heterogram in this case also cannot include numbers and punctuation)
// Returns True if string is a valid heterogram we can react with, and returns false otherwise.
function isHeterogram(string){
    // Dictionary for determining the frequency of characters in the string
    let stringFreq = {};

    // Check if the string has more than 20 characters
    if(string.length > 20){
        return false;
    }

    // iterate over each character in the string
    for(let i = 0; i < string.length; i++){
        // Check if the character has frequency > 1, character is a number or character is a punctuation.
        if(stringFreq.hasOwnProperty(string.charAt(i)) || !isNaN(string.charAt(i)) || !string.charAt(i).match(/[a-z]/i)){
            return false;
        } else {
            stringFreq[string.charAt(i)] = 1;
        }
    }
    // String is a valid heterogram we can react with. Return true.
    return true;
}