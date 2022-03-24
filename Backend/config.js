import admin from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// admin.initializeApp(firebaseConfig);
const db = admin.firestore();
const TiktokData = db.collection("Tiktok Data");
export default TiktokData;
