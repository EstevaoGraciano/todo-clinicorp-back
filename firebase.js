const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./config/firebase-config.json");

initializeApp({
    credential: cert(serviceAccount),
});

const DB = getFirestore();

module.exports = { DB };
