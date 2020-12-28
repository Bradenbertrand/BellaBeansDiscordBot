var mysql = require('mysql');
require("dotenv").config();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_ID
  });

//Connect to database
con.connect(function(err) {
    console.log("Trying to connect");
    if (err) throw err;
    var sql = "INSERT INTO emojiCounter (emoji, timesUsed) VALUES ?"
    var values = [
        ['vadim2', 0],
        ['vadim', 0],
        ['steoh', 0],
        ['safwan', 0],
        ['safwan2', 0],
        ['recoome', 0],
        ['poopy', 0],
        ['PogChamp', 0],
        ['pat', 0],
        ['noanime', 0],
        ['linus', 0],
        ['jeice', 0],
        ['hypsoblenniuscaulopus', 0],
        ['howspeter', 0],
        ['hoodbraden', 0],
        ['hassciencegonetoofar', 0],
        ['happyhamza', 0],
        ['Handy', 0],
        ['guldo', 0],
        ['ginyu', 0],
        ['gamer', 0],
        ['faheem', 0],
        ['daveMoji', 0],
        ['Coronastronomy', 0],
        ['cogchamp', 0],
        ['christine', 0],
        ['byemary', 0],
        ['burter', 0],
        ['burny', 0],
        ['brent', 0],
        ['Apu', 0],
        ['amrewchamp', 0],
        ['amrew', 0],
        ['amphapeter', 0],
        ['americanhero', 0]
      ];
      con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records insterted: " + result.affectedRows)
      })
});