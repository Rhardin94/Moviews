const firebase = require("firebase/app");
require("firebase/auth");
const firebaseConfig = require("./connection");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Reference the database
const database = firebase.database();
// Track connections and Authorizations
const connectedRef = database.ref(".info/connected");
const connectionsRef = database.ref("connections");
//Checking for client connection changes
connectedRef.on("value", (snap) => {
  //If connection change occurs
  if (snap.val()) {
    //Add user to connections list
    let con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});