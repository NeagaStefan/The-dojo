
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCOs9c7rbwvT7DIPrZK475_lIN1UUXBPoM",
    authDomain: "thedojosite-613e3.firebaseapp.com",
    projectId: "thedojosite-613e3",
    storageBucket: "thedojosite-613e3.appspot.com",
    messagingSenderId: "740218918688",
    appId: "1:740218918688:web:be6e86e3d7958f53166945"
};


//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp
const  timestamp = firebase.firestore.Timestamp

export { projectAuth, projectFirestore,projectStorage, timestamp  }
