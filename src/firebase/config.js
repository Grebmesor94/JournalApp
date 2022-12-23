// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
  // apiKey: "AIzaSyB1WhoeehiVHFNVSYSML1bvyaptKqN_b3w",
  // authDomain: "react-curso-58235.firebaseapp.com",
  // projectId: "react-curso-58235",
  // storageBucket: "react-curso-58235.appspot.com",
  // messagingSenderId: "795248225808",
  // appId: "1:795248225808:web:54ee7dd8509c6595dce495"
// };

//testing
// const firebaseConfig = {
//   apiKey: "AIzaSyCgnMLYgGIpAAQbHE-G0PZroXaMbwpGj7w",
//   authDomain: "react-curso-pruebas.firebaseapp.com",
//   projectId: "react-curso-pruebas",
//   storageBucket: "react-curso-pruebas.appspot.com",
//   messagingSenderId: "1000462876582",
//   appId: "1:1000462876582:web:49a3358ef7354047649967"
// };
const { VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments()

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
}

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );