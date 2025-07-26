// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8c86L4VqYGJC5cNPcVo21obmdDon4teY",
  authDomain: "project1-8353c.firebaseapp.com",
  projectId: "project1-8353c",
  storageBucket: "project1-8353c.firebasestorage.app",
  messagingSenderId: "14635586400",
  appId: "1:14635586400:web:9fbefe4af9859829f2c405",
  measurementId: "G-LR7LTY0MSC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);