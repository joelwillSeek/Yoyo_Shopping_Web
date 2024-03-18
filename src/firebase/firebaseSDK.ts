// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTx6kI1MTNSP9sm0Br-DDQFoYFUjmFaJY",
  authDomain: "testing-admin-web.firebaseapp.com",
  projectId: "testing-admin-web",
  storageBucket: "testing-admin-web.appspot.com",
  messagingSenderId: "767975120881",
  appId: "1:767975120881:web:549b1605330d9a9f35ae50",
  measurementId: "G-6D4YKD2HJQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const imageRef = ref;
