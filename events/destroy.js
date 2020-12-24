
function execute(message, args){
    let command = "";
    for(arg of args){
        command+=arg + " ";
    }
    message.channel.send(command.substring(0,command.length-1) + " has been destroyed!");
}

exports.execute = execute;