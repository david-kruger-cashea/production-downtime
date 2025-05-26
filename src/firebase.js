import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBX9gWelTQV4jzZYuQwMbJdqwWL8HyLV40",
    authDomain: "cashea-production-downtime.firebaseapp.com",
    projectId: "cashea-production-downtime",
    storageBucket: "cashea-production-downtime.firebasestorage.app",
    messagingSenderId: "304928766244",
    appId: "1:304928766244:web:104592418769a6d2f65bb1",
    measurementId: "G-VX5RLMB9X2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };