import { MutationTree } from 'vuex'

import { State } from './state'
import { AuthenticatedUser } from '@/models/AuthenticatedUser'
import { User } from '@/models/user'

export enum MutationTypes {
    MUTATE_AUTHENTICATED_USER = 'user/mutate-authenticated-user',
    MUTATE_IS_AUTHENTICATED = 'user/mutate-is-authenticated',
    MUTATE_USERS = 'user/mutate-users',
    MUTATE_DELETE_USER = 'user/mutate-delete-user',
    MUTATE_UPDATE_USER = 'user/mutate-update-user',
}

export type Mutations<S = State> = {
    [MutationTypes.MUTATE_AUTHENTICATED_USER](state: S, user: AuthenticatedUser): void,
    [MutationTypes.MUTATE_IS_AUTHENTICATED](state: S, isAuthenticated: boolean): void,
    [MutationTypes.MUTATE_USERS](state: S, users: User[]): void,
    [MutationTypes.MUTATE_DELETE_USER](state: S, userId: string): void,
    [MutationTypes.MUTATE_UPDATE_USER](state: S, user: User): void,
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.MUTATE_AUTHENTICATED_USER](state: State, user: AuthenticatedUser) {
        state.authenticatedUser = { ...user }
    },

    [MutationTypes.MUTATE_IS_AUTHENTICATED](state: State, isAuthenticated: boolean) {
        state.isAuthenticated = isAuthenticated
    },

    [MutationTypes.MUTATE_USERS](state: State, users: User[]) {
        state.users = [...users]
    },

    [MutationTypes.MUTATE_DELETE_USER](state: State, userId: string) {
        state.users = state.users.filter(u => u.id !== userId)
    },

    [MutationTypes.MUTATE_UPDATE_USER](state: State, user: User) {
        state.users = state.users
            .map(u => u.id === user.id
                ? { ...user }
                : u)
    }
}