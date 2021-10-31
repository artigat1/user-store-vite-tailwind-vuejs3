import { State } from '@/models/state'
import { AuthenticatedUser } from '@/models/authenticated-user'

export const MUTATE_USER = 'user/mutate-user'
export const MUTATE_IS_AUTHENTICATED = 'user/mutate-is-authenticated'

export type Mutations<S = State> = {
    [MUTATE_USER](state: S, user: AuthenticatedUser): void,
    [MUTATE_IS_AUTHENTICATED](state: S, isAuthenticated: boolean): void,
}

export const mutations: Mutations = {
    [MUTATE_USER](state, user) {
        state.user = user
    },

    [MUTATE_IS_AUTHENTICATED](state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated
    }
}