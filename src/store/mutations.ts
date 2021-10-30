import { State } from "@/models/state";
import { AuthenticatedUser } from '@/models/auth-user'

export const MUTATE_USER = 'MUTATE_USER'
export const MUTATE_IS_AUTHENTICATED = 'MUTATE_IS_AUTHENTICATED'

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