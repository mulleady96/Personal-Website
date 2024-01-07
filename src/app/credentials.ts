// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const config = {
  apiKey: "AIzaSyBVUtCz5WhqKYJuX214UCD0T8isyXTx9b8",
  authDomain: "gravitatech-9ce75.firebaseapp.com",
  databaseURL: "https://gravitatech-9ce75.firebaseio.com",
  projectId: "gravitatech-9ce75",
  storageBucket: "gravitatech-9ce75.appspot.com",
  messagingSenderId: "423306862312",
  appId: "1:423306862312:web:f424c27dad403cbaa9f35d",
  measurementId: "G-MHYXL3F15W",
};

// Initialize Firebase
const app = initializeApp(config);
const analytics = getAnalytics(app);
