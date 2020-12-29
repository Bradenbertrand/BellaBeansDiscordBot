const { MessageFlags, Client } = require("discord.js");

function execute(message, args){
    let command = "";

    if(message.mentions.members.size == 1 && !message.mentions.members.first().user.bot){

        let user = message.mentions.members.first();
        message.channel.send(user.toString() + " has been destroyed!");

        //sends everything after the mention to that user's dms
        let response = "";
        let options = [];
        let before = true;
        for(arg of args){
            if(isAt(arg)){
                before = false;
                continue;
            }
            if(before){
                options.push(arg);
            } else {
                response += arg + " ";
            }
        }

        if(response)
            user.send(response);

        sendToEveryChannel(message, user.toString());

    } else {
        message.channel.send("You must @ a user to destroy them, feel free to also leave an additional message which I will leave in their DM's ```-b destroy @someuser enjoy the years of expensive therapy!```")
    }
}

//determine if a string is @'ing someone
function isAt(msg){
    if(msg.startsWith("<@") && msg.endsWith(">")){
        return true;
    }
    return false;
}

//sends a given string argument to every channel
function sendToEveryChannel(message, argument){
    for(let keyVal of message.guild.channels.cache){
        let channel = keyVal[1];
        if(channel.type === "text" && channel.name !== message.channel.name && channel.parentID === message.channel.parentID){
            channel.send(argument);
        }
    }
}

exports.execute = execute;