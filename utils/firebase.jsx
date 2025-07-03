import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAg1s8cJFlqDE4rXp1Wt3sW0NGire8hR_U',
  authDomain: 'bingelord-99d43.firebaseapp.com',
  projectId: 'bingelord-99d43',
  storageBucket: 'bingelord-99d43.appspot.com',
  messagingSenderId: '578658872203',
  appId: '1:578658872203:web:81c58d9f663f8e176c1d8e',
  databaseURL: 'https://bingelord-99d43-default-rtdb.firebaseio.com',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)

export { auth, database }
