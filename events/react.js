//async function react(message){


async function execute(message, args){
    // Parse the user command.
    // let args = message.content.split(" ").slice(2);
    // console.log("Message: " + message.content);
    // console.log("Arguments: [" + args + "]");

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

exports.execute = execute; 
