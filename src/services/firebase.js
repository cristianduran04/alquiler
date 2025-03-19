// Importar Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBy9OwonW6h1rlplln78A7ePAuDFXEXTTY",
  authDomain: "alquiler-7288d.firebaseapp.com",
  projectId: "alquiler-7288d",
  storageBucket: "alquiler-7288d.appspot.com",
  messagingSenderId: "285536236681",
  appId: "1:285536236681:web:b0ea4a53b1d10eaadd4258",
  measurementId: "G-BHDENVTSY5",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
