import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    appName: 'game-room',
    apiKey: 'AIzaSyC9EchjagE1kjLhyqz4IfKG6-WryhNTXfs',
    authDomain: 'game-room-0.firebaseapp.com',
    projectId: 'game-room-0',
    storageBucket: 'game-room-0.appspot.com',
    messagingSenderId: '807647086434',
    appId: '1:807647086434:web:b66af874bea6f0d7a68e3b',
    measurementId: 'G-1QS2W225GR'
  })
} else {
  firebase.app() // if already initialized, use that one
}

export const auth = firebase.auth
export const db = firebase.firestore()
