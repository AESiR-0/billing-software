import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_PQdrJCSC1D5FF1duYKwz9FZB8PfMyRY",
  authDomain: "billing-agency-ef6bb.firebaseapp.com",
  projectId: "billing-agency-ef6bb",
  storageBucket: "billing-agency-ef6bb.appspot.com",
  messagingSenderId: "32070400713",
  appId: "1:32070400713:web:ce2d95ab3b71b0042e6b18",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
