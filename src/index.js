import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
    apiKey: "AIzaSyDjf8vKWern9T_J5V9jsHp2AqojuAwX2MI",
    authDomain: "react-chat-93272.firebaseapp.com",
    projectId: "react-chat-93272",
    storageBucket: "react-chat-93272.appspot.com",
    messagingSenderId: "1021375904192",
    appId: "1:1021375904192:web:6178f7f724bdf357c17025",
    measurementId: "G-0G3X4T66SY"
});

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);

