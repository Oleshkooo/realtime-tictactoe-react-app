import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCaNOY3yGU02R5rZKUeQITTALqJcXwfJlk",
    authDomain: "oleshko-online-shop.firebaseapp.com",
    projectId: "oleshko-online-shop",
    storageBucket: "oleshko-online-shop.appspot.com",
    messagingSenderId: "83286662007",
    appId: "1:83286662007:web:0dcf04dbf193e382295f72",
    databaseURL: "https://oleshko-online-shop-default-rtdb.europe-west1.firebasedatabase.app"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export default db