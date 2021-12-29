import { AugmentedActionContext } from '@/store/AugmentedActionContext'
import { ActionTree } from 'vuex'

import { State } from '@/store/state'
import { MutationTypes } from '@/store/mutations'
import { deleteUserById, getUsers, updateUser } from '@/api/users.db'
import { User } from '@/models/user'

export enum ActionTypes {
    FETCH_ALL_USERS = 'user/fetch-all-users',
    DELETE_USER = 'user/delete-user',
    UPDATE_USER = 'user/update-user',
}

export interface Actions {
    [ActionTypes.FETCH_ALL_USERS](
        { commit }: AugmentedActionContext,
    ): void,

    [ActionTypes.DELETE_USER](
        { commit }: AugmentedActionContext,
        id: number,
    ): void,

    [ActionTypes.UPDATE_USER](
        { commit }: AugmentedActionContext,
        user: User,
    ): void,
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.FETCH_ALL_USERS]({ commit }) {
        try {
            const response = await getUsers()
            commit(MutationTypes.MUTATE_USERS, response)
        } catch (error) {
            console.error(error)
        }
    },

    async [ActionTypes.DELETE_USER]({ commit }, userId: string) {
        try {
            await deleteUserById(userId)
            commit(MutationTypes.MUTATE_DELETE_USER, userId)
        } catch (error) {
            console.error(error)
        }
    },

    async [ActionTypes.UPDATE_USER]({ commit }, user: User) {
        try {
            await updateUser(user)
            commit(MutationTypes.MUTATE_UPDATE_USER, user)
        } catch (error) {
            console.error(error)
        }
    }
}
