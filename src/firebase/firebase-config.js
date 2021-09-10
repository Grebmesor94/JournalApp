import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider} from 'firebase/auth'

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyDMEN73dcHiMSSd45JUTeOfKzvLoGglENQ",

  authDomain: "journalapp-curso-7558d.firebaseapp.com",

  projectId: "journalapp-curso-7558d",

  storageBucket: "journalapp-curso-7558d.appspot.com",

  messagingSenderId: "955797644895",

  appId: "1:955797644895:web:2ebdbccb7f220a2d3eddea"

};

initializeApp(firebaseConfig);

const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
}