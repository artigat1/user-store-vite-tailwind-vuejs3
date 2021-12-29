import { GetterTree } from 'vuex'

import { State } from './state'
import { AuthenticatedUser } from '@/models/authenticated-user'

export type Getters = {
    user(state: State): AuthenticatedUser | undefined,
    isAuthenticated(state: State): boolean,
}

export const getters: GetterTree<State, State> & Getters = {
    user: (state: State) => {
        return state.user
    },

    isAuthenticated: (state: State): boolean => {
        return state.isAuthenticated
    }
}