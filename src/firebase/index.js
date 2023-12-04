const admin = require("firebase-admin");

const serviceAccount = require("./room-manager-14ddc-firebase-adminsdk-i3yn9-33afe0b06c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin