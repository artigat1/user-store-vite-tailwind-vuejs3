import FirebaseFirestore, {
    browserSessionPersistence,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

import { auth } from './firebase'
import { store } from '@/store'
import { AuthenticatedUser } from '@/models/authenticated-user'
import { MUTATE_IS_AUTHENTICATED, MUTATE_USER } from '../store/mutations'

onAuthStateChanged(auth, (user: any) => {
    if (user) {
        store.commit(MUTATE_IS_AUTHENTICATED, true)
        const authUser: AuthenticatedUser = {
            email: user.email,
            accessToken: user.accessToken,
            id: user.uid,
            lastLoginAt: user.metadata.lastSignInTime,
        }
        store.commit(MUTATE_USER, authUser)
    } else {
        store.commit(MUTATE_IS_AUTHENTICATED, false)
        store.commit(MUTATE_USER, undefined)
    }
})

export const login = async (email: string, password: string): Promise<FirebaseFirestore.UserCredential> => {
    await setPersistence(auth, browserSessionPersistence)
    return signInWithEmailAndPassword(auth, email, password)
}

export const logout = async (): Promise<void> => {
    return signOut(auth)
}