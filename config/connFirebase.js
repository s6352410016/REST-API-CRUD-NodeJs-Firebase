var admin = require("firebase-admin");

var serviceAccount = require("../react-firebase-mytravel-app-firebase-adminsdk-8rcol-b786a1d5d5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;