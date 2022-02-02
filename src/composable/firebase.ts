import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.initializeApp({
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.FIREBASE_APP_ID,
    measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID
}).firestore()

export const useFirebaseDb = (dbName: string) =>{
    return db.collection(dbName)
}