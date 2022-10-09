import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBtEtWEQ5Glp0c9YcgDqyIoQNwi7Wbgb70",
  authDomain: "weather-ts-app.firebaseapp.com",
  projectId: "weather-ts-app",
  storageBucket: "weather-ts-app.appspot.com",
  messagingSenderId: "250081598323",
  appId: "1:250081598323:web:08c01ddf932fb0474b0306",
  measurementId: "G-78HVQH3XGT"
};

const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);


export { storage, analytics}



