//The core Firebase JS SDK is always required and must be listed first
//<script src="https://www.gstatic.com/firebasejs/6.0.0/firebase-app.js"></script>

const firebase = require("firebase/app");
require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
  //  https://firebase.google.com/docs/web/setup#config-web-app -->

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAXJhN9GMJrJAHB0qVLx6xva2eSWgtDfSM",
    authDomain: "movie-reviews-team5.firebaseapp.com",
    databaseURL: "https://movie-reviews-team5.firebaseio.com",
    projectId: "movie-reviews-team5",
    storageBucket: "movie-reviews-team5.appspot.com",
    messagingSenderId: "599160193623",
    appId: "1:599160193623:web:1549d5f2db103b13"
  };
module.exports = firebaseConfig;