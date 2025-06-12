// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDS8E53pTmhqXxuD2cGCnlu5zIyv4JFoMM",
    authDomain: "fileshare-pro-b274c.firebaseapp.com",
    projectId: "fileshare-pro-b274c",
    storageBucket: "fileshare-pro-b274c.firebasestorage.app",
    messagingSenderId: "57248357921",
    appId: "1:57248357921:web:dac47fb44aa4c031e38d60",
    measurementId: "G-TNLM1EVWF0"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db, ref, uploadBytes, getDownloadURL, collection, addDoc, getDocs, query, orderBy, limit };
