
function execute(message, args){
    // let args = message.content.split(" ").slice(2);
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

exports.execute = execute;