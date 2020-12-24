//message object, args array
const https = require('https');

function execute(message, args){
    let fullName = fixName(args.slice(1));
    findPerson(message, fullName);
}

function findPerson(message, fullName) {

    //wikipedia json formatted data
    let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + fullName;
    https.get(url, function(response) {
        let data = "";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            
            let pages = JSON.parse(data).query.pages;
            let about = "";
            for (property in pages) {
                if (pages[property].hasOwnProperty("pageid")) {
                    about = pages[property].extract;
                }
            }
            
            //grab the first two sentences about the person
            //not perfect, what if a period is used say with a term like jr.
            about = about.split(". ");
            let res = about[0] + ".\n\n" + about[1] + ".";


            if (about[0].includes("may refer to:")) {
                console.log("Finding person failed")
                message.channel.send("Sorry, too many results!")
            } else if (!about[0] || !about[1]){
                message.channel.send("Sorry, couldnt find them!");
            }
            else {
                message.channel.send(res);
            }
        });
    }).on("error", function(error) {
        message.channel.send("Sorry, I couldn't find them! Error: " + error);
    })
}


function fixName(name) {
    // name = name.split(" ");
    let fullName = "";
    //each part of the name (first ~~middle~~ last etc)
    for (let part of name) {
        let firstLetter = part[0].toUpperCase();
        let restOfName = part.substring(1, part.length).toLowerCase();
        fullName += firstLetter + restOfName + " ";
    }
    return fullName;
}

exports.execute = execute; 