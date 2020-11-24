//  This file contains the message handlers

//This module is exported to bot.js
//All message response related functions should be run from the messageHandler function
//If function is not triggered by the message, should return false.

require("../src/bot");
const https = require('https');

module.exports = {
    messageHandler: function messageHandler(message) {
        //Conditional statements to determine if message was meant for bot
        var messageText = message.content.toLowerCase();
        var messageChannel = message.channel;
        if (messageText.substring(0, 5) === "bella" | "beans") {
            console.log("First Response")
            BellaBeansResponse(message, messageChannel);
        } else if (messageText.includes("bbbot", 0)) {
            console.log("Heard My Name");
            heardMyName(messageText, messageChannel);
        } else if (messageText === "motto") {
            bellaSelfEdit(messageText, messageChannel);
        } else if (messageText.startsWith("who is")) {
            console.log('who is')
            parseCommand(message);
        } else {
            //Do Nothing if message wasnt meant for me :(
        }

    }
}


// 
function BellaBeansResponse(message, channel) {
    // If the message is "bella"
    if (message.content.toLowerCase() === 'bella') {
        // Send "Beans" to the same channel
        channel.send('Beans');
        // If the message is 'beans'
    } else if (message.content.toLowerCase() === 'beans') {
        channel.send('Bonstruction');
    } else if (message.content.toLowerCase().startsWith("who is")) {
        parseCommand(message); //more like handle command
    } else {
        // Do Nothing
    }
}

// Sleep function for async delay
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// Sends a message, then edits itself to write out BBB
async function bellaSelfEdit(message, channel) {
    //If function is called
    if (message === 'b!motto') {
        //Send "bella"
        channel.send('Bella').then(async(sentMessage) => {
            //Wait 1 second
            await sleep(1222);
            //Edit the message to "Beans"
            sentMessage.edit("Beans").then(async(sentMessage) => {
                //Wait 1 second
                await sleep(1222);
                //Edit the message to "Bonstruction"
                sentMessage.edit("Bonstruction");
            });
        });
    } else {
        //Do nothing
    }
}

// Will trigger if the message contains bbbot
function heardMyName(message, channel) {
    //If message contains bbbot
    if (message.includes("bbbot", 0)) {
        //send "I heard my name" to the same channel
        channel.send("I heard my name!");
    }
}


//
function parseCommand(message) {
    let command = message.content.toLowerCase().substring(6);
    //find out more about a person
    // console.log(command);
    if (command.toLowerCase().startsWith("who is")) {
        findPerson(message, command);
    }
}

function findPerson(message, command) {
    //probably bad practice to just count out how long the command is lol
    let person = fixName(command.substring(7));
    // console.log(person);

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
            // console.log(String(res));
            message.channel.send(res);
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