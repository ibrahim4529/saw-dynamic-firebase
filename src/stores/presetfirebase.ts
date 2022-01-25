import firebase from 'firebase/app'
import 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase/useFirestore'
const db = firebase.initializeApp({
    apiKey: "AIzaSyDfVnd4NVLaq9thJig_Ye322jlhhA4k4Go",
    authDomain: "dynamic-saw.firebaseapp.com",
    projectId: "dynamic-saw",
    storageBucket: "dynamic-saw.appspot.com",
    messagingSenderId: "191476685090",
    appId: "1:191476685090:web:0a21e5240c01131ecbed7b",
    measurementId: "G-L99424TCKP"
}).firestore()
const presetCollection = db.collection('presets')
export const usePresetFirebase = () => {
   return {
    presetCollection: presetCollection,
    presets: useFirestore(presetCollection)
   }
}