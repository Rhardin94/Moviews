let mysql = require("mysql");
let connection;

if (process.env.JAWSDB_URL) {
  connection =  mysql.createConnection(process.env.JAWSDB_URL);
  // JAWS_DB to make sure this deploys to Heroku successfully.
} else {
  // Local connection for testing.
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: null,
    database: "movies_db"
  });
};

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  module.exports = connection;