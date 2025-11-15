import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDIuwqYk1Om_A8cMQ403EUBCU6nTTPMQ9A",
  authDomain: "web-dev-se-57abb.firebaseapp.com",
  projectId: "web-dev-se-57abb",
  storageBucket: "web-dev-se-57abb.firebasestorage.app",
  messagingSenderId: "229913694791",
  appId: "1:229913694791:web:17fd3c135e08a94c071762",
  measurementId: "G-XF9V3YCM2L"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)