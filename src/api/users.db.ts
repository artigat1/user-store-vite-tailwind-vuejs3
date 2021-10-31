import FirebaseFirestore, {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    updateDoc,
    query
} from 'firebase/firestore'

import { db } from './firebase'
import { User } from "@/models/user"

const collectionName = 'users'

const userConverter = {
    toFirestore: (data: User) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = snap.data()
        return {
            id: snap.id,
            ...data,
        } as User
    }
}

const usersCollection = collection(db, collectionName).withConverter(userConverter)

export const getUsers = async (): Promise<User[]> => {
    const q = query(usersCollection, orderBy('name'))
    const userSnapshot = await getDocs(q)
    return userSnapshot.docs.map(doc => doc.data())
}

export const getUserById = async (id: string): Promise<User | null> => {
    const docRef = getDocRef(id).withConverter(userConverter)
    const userSnapshot = await getDoc(docRef)
    if (userSnapshot.exists()) {
        return userSnapshot.data()
    }
    return null
}

export const createUser = async (user: User): Promise<string> => {
    const response = await addDoc(usersCollection, user)
    return response.id
}

export const deleteUserById = async (id: string): Promise<void> => {
    await deleteDoc(getDocRef(id))
}

export const updateUser = async(user: User): Promise<void> => {
    return await updateDoc(getDocRef(user.id as string), user)
}

const getDocRef = (id: string):  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> => {
    return doc(db, collectionName, id)
} 