//  This file contains the message handlers

//This module is exported to bot.js
//All message response related functions should be run from the messageHandler function
//If function is not triggered by the message, should return false.

require("../src/bot");

module.exports = {
    messageHandler: function messageHandler(message) {
        //Logs first two characters of every message
        console.log("First two characters of message = " + message.content.substring(0, 2));
        //Conditional statements to determine if message was meant for bot
        if (message.content.toLowerCase().substring(0, 2) === "b!" || message.content.includes("BBBot", 0) && message.author.id !== client.user.id) {
            console.log("This message is for the bot!")
            BellaBeansResponse(message);
            bellaSelfEdit(message);
        } else {
            //Do Nothing if message wasnt meant for me :(
        }

    }
}


// 
function BellaBeansResponse(message) {
    // If the message is "bella"
    if (message.content.toLowerCase() === 'b!bella') {
        // Send "Beans" to the same channel
        message.channel.send('Beans');
        // If the message is 'beans'
    } else if (message.content.toLowerCase() === 'b!beans') {
        message.channel.send('Bonstruction');
    } else {
        // Returns false
        return (false)
    }
}

// Sleep function for async delay
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function bellaSelfEdit(message) {
    //If function is called
    if (message.content.toLowerCase() === 'b!motto') {
        //Send "bella"
        message.channel.send('Bella').then(async(sentMessage) => {
            //Wait 1 second
            await sleep(1000);
            //Edit the message to "Beans"
            sentMessage.edit("Beans").then(async(sentMessage) => {
                //Wait 1 second
                await sleep(1000);
                //Edit the message to "Bonstruction"
                sentMessage.edit("Bonstruction");
            });
        });
    }
}