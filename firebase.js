import {
    getApps,
    getApp,
    initializeApp
  } from 'firebase/app';
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEF2fwnF6mTYELcU0Xmu9Xx0DYHIzBgLk",
    authDomain: "easy4u-1c535.firebaseapp.com",
    projectId: "easy4u-1c535",
    storageBucket: "easy4u-1c535.appspot.com",
    messagingSenderId: "424897283849",
    appId: "1:424897283849:web:ddd3c1fa80395551f4f5d8"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };