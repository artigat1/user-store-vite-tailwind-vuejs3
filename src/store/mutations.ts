import { MutationTree } from 'vuex'

import { State } from './state'
import { AuthenticatedUser } from '@/models/authenticated-user'

export enum MutationTypes {
    MUTATE_USER = 'user/mutate-user',
    MUTATE_IS_AUTHENTICATED = 'user/mutate-is-authenticated',
}

export type Mutations<S = State> = {
    [MutationTypes.MUTATE_USER](state: S, user: AuthenticatedUser): void,
    [MutationTypes.MUTATE_IS_AUTHENTICATED](state: S, isAuthenticated: boolean): void,
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.MUTATE_USER](state, user: AuthenticatedUser) {
        state.user = user
    },

    [MutationTypes.MUTATE_IS_AUTHENTICATED](state, isAuthenticated: boolean) {
        state.isAuthenticated = isAuthenticated
    }
}