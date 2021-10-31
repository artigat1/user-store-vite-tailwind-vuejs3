import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from './firebase.config'
const firebaseApp = initializeApp(firebaseConfig)

// utils
const db = getFirestore(firebaseApp)
const auth = getAuth()

// export utils/refs
export {
    db,
    auth,
}