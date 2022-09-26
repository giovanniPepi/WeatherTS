import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtEtWEQ5Glp0c9YcgDqyIoQNwi7Wbgb70",
  authDomain: "weather-ts-app.firebaseapp.com",
  projectId: "weather-ts-app",
  storageBucket: "weather-ts-app.appspot.com",
  messagingSenderId: "250081598323",
  appId: "1:250081598323:web:08c01ddf932fb0474b0306"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export { storage}



