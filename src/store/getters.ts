import { GetterTree } from 'vuex'

import { State } from './state'
import { AuthenticatedUser } from '@/models/AuthenticatedUser'
import { User } from '@/models/user'

export type Getters = {
    authenticatedUser(state: State): AuthenticatedUser | undefined,
    isAuthenticated(state: State): boolean,
    users(state: State): User[],
    getUserById(state: State, userId: string): User | undefined,
}

export const getters: GetterTree<State, State> & Getters = {
    authenticatedUser: (state: State) => {
        return state.authenticatedUser
    },

    isAuthenticated: (state: State): boolean => {
        return state.isAuthenticated
    },
    
    users: (state: State): User[] => {
        return state.users
    },
    
    getUserById: (state: State) => (userId: string): User | undefined => {
        console.log('getUserById', userId)
        const user = state.users.find(user => user.id === userId)
        console.log({user})
        return user        
    }
}