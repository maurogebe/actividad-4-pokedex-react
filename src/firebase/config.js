import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD5xk9617b7kg8uXH9uWBiLG4tHzjk5W68",
    authDomain: "pokedex-maurogebe.firebaseapp.com",
    databaseURL: "https://pokedex-maurogebe.firebaseio.com",
    projectId: "pokedex-maurogebe",
    storageBucket: "pokedex-maurogebe.appspot.com",
    messagingSenderId: "454540795994",
    appId: "1:454540795994:web:cc9273823ceba480a37863",
    measurementId: "G-0X3RTLRK78"
  };

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export default firebase