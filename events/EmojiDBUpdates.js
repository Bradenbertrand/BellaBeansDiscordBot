var mysql = require('mysql');
require('./messages');
require("dotenv").config();


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_ID
});


module.exports = {
  emojiParser: function emojiParser(emojis) {
      //Conditional statements to determine if message was meant for bot
      console.log(emojis)
      for (let i = 0; i < emojis.length;  i++) {
        var emojiRaw = emojis[i].slice(emojis[i].indexOf(':')+1, emojis[i].lastIndexOf(':'))
        var sql = "UPDATE emojiCounter SET timesUsed = timesUsed+1 WHERE emoji='" + emojiRaw + "'" ;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Updated ' + emojiRaw + " timesUsed")
        
        });
      }
  },
  getEmojiLeaderboard: function getEmojiLeaderboard(message) {
    var sql = "SELECT emoji, timesUsed FROM emojiCounter ORDER BY timesUsed DESC LIMIT 5";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      var string = JSON.parse(JSON.stringify(result));
      leaderboardReply = "Here are the top 5 most used emojis:\n"
      +string[0].emoji+" : "+string[0].timesUsed+"\n"
      +string[1].emoji+": "+string[1].timesUsed+"\n"
      +string[2].emoji+": "+string[2].timesUsed+"\n"
      +string[3].emoji+": "+string[3].timesUsed+"\n"
      +string[4].emoji+": "+string[4].timesUsed+"\n"
      message.channel.send(leaderboardReply);
    });
  }
}