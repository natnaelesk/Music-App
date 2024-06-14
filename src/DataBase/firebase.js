import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5yLz_Q-wEZI5sB_RdUqSmzz4ob6keg8M",
  authDomain: "music-player-7c90b.firebaseapp.com",
  projectId: "music-player-7c90b",
  storageBucket: "music-player-7c90b.appspot.com",
  messagingSenderId: "943462630724",
  appId: "1:943462630724:web:6b3c1794c7fcd6be250311"
};

const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);
const db = getFirestore(app);

export { imgDB, db };
