import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc2amwJHYEZ2KyQPQJiDrbBtIsdTmWjk8",
  authDomain: "react-authentication-cb1e5.firebaseapp.com",
  projectId: "react-authentication-cb1e5",
  storageBucket: "react-authentication-cb1e5.appspot.com",
  messagingSenderId: "1002828932777",
  appId: "1:1002828932777:web:fb30960a032946b5acabb8",
  measurementId: "G-W5EEZTMM0E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const fbProvider = new FacebookAuthProvider();
export const ggProvider = new GoogleAuthProvider();
export const db =  getFirestore(app);
export const usersRef = collection(db, 'users');
