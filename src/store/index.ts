import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { AuthenticatedUser } from '@/models/authenticated-user'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

export interface State {
    user?: AuthenticatedUser,
    isAuthenticated: Boolean,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    strict: import.meta.env.PROD === false,
    state: {
        user: {} as AuthenticatedUser,
        isAuthenticated: false,
    },
    getters,
    mutations,
    actions,
})

// define your own `useStore` composition function
export function useStore () {
    return baseUseStore(key)
}