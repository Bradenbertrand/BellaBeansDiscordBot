//  This file contains the message handlers

//This module is exported to bot.js
//All message response related functions should be run from the messageHandler function
//If function is not triggered by the message, should return false.

require("../src/bot");

module.exports = {
    messageHandler: function messageHandler(message) {
        //Conditional statements to determine if message was meant for bot
        var messageText = message.content.toLowerCase();
        var messageChannel = message.channel;
        if (messageText.substring(0, 2) === "b!" || messageText.includes("bbbot", 0) && message.author.id !== client.user.id) {
            console.log(messageText);
            console.log("This message is for the bot!");
            BellaBeansResponse(messageText, messageChannel);
            bellaSelfEdit(messageText, messageChannel);
            heardMyName(messageText, channel)
        } else {
            //Do Nothing if message wasnt meant for me :(
        }

    }
}


// 
function BellaBeansResponse(message, channel) {
    // If the message is "bella"
    if (message === 'b!bella') {
        // Send "Beans" to the same channel
        channel.send('Beans');
        // If the message is 'beans'
    } else if (message === 'b!beans') {
        channel.send('Bonstruction');
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
            await sleep(2000);
            //Edit the message to "Beans"
            sentMessage.edit("Beans").then(async(sentMessage) => {
                //Wait 1 second
                await sleep(2000);
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