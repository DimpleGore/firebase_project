const admin = require('firebase-admin');

var serviceAccount = require('../admin.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-node-90b89-default-rtdb.firebaseio.com/",
  storageBucket: "gs://firebase-node-90b89.appspot.com",
  authDomain: "firebase-node-90b89.firebaseapp.com",
});

module.exports = admin;