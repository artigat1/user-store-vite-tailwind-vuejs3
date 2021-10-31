import { State } from '@/models/state'
import { AuthenticatedUser } from '@/models/authenticated-user'

export type Getters<S = State> = {
    user(state: S): AuthenticatedUser | undefined,
    isAuthenticated(state: S): boolean,
}

export const getters: Getters = {
    user: (state: State): AuthenticatedUser | undefined => {
        return state.user
    },

    isAuthenticated: (state: State): boolean => {
        return state.isAuthenticated
    }
}