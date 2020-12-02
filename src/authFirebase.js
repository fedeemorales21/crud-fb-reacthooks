import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzzkdKTvTztDFNUA51yXhHiOwMFhuVArs",
    authDomain: "crud-books-f1c7d.firebaseapp.com",
    databaseURL: "https://crud-books-f1c7d.firebaseio.com",
    projectId: "crud-books-f1c7d",
    storageBucket: "crud-books-f1c7d.appspot.com",
    messagingSenderId: "438102308258",
    appId: "1:438102308258:web:6ff34d6f35a3603b052efb"
}
  
// Initialize Firebase
const init = firebase.initializeApp(firebaseConfig)

// exec method storage
export const db = init.firestore()


