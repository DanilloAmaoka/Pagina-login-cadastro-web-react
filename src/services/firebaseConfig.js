import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAbjawXaxhEpbLlJqDDVrQOcbHGTrA4Lmg",
  authDomain: "atividadesomativa-24e6e.firebaseapp.com",
  projectId: "atividadesomativa-24e6e",
  storageBucket: "atividadesomativa-24e6e.firebasestorage.app",
  messagingSenderId: "490495922108",
  appId: "1:490495922108:web:0459ae7945a97d8bc3e5b9",
  measurementId: "G-W6FCHQTXTN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);