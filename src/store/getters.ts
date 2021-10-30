import { State } from '@/models/state'
import { AuthenticatedUser } from '@/models/auth-user'

export const GET_USER = 'GET_USER'
export const GET_IS_AUTHENTICATED = 'GET_IS_AUTHENTICATED'

export type Getters<S = State> = {
    [GET_USER](state: S): AuthenticatedUser | undefined,
    [GET_IS_AUTHENTICATED](state: S): boolean,
}

export const getters: Getters = {
    [GET_USER](state: State): AuthenticatedUser | undefined {
        return state.user
    },

    [GET_IS_AUTHENTICATED](state: State): boolean {
        return state.isAuthenticated
    }
}