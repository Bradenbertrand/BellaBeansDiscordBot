//  This file contains the message handlers

//This module is exported to bot.js
//All message response related functions should be run from the messageHandler function
//If function is not triggered by the message, should return false.
module.exports = {
    messageHandler: function messageHandler(message) {
        BellaBeansResponse(message);
        bellaSelfEdit(message);

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


function bellaSelfEdit(message) {
    if (message.content.toLowerCase() === 'b!motto') {
        message.channel.send('Bella').then((sentMessage) => {
            sentMessage.edit("Beans").then(sentMessage => {
                sentMessage.edit("Bonstruction");
            });
        });
    }
}