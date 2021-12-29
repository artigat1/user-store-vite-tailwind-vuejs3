import { InjectionKey } from 'vue'
import {
    CommitOptions,
    createLogger,
    createStore,
    DispatchOptions,
    Store as VuexStore,
    useStore as baseUseStore
} from 'vuex'

import { Actions, actions } from './actions'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { state } from '@/store/state'

export type Store = Omit<VuexStore<State>,
    'commit' | 'getters' | 'dispatch'> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>;
    };
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>;
};

export const key: InjectionKey<Store> = Symbol()

export const store = createStore<State>({
    strict: import.meta.env.PROD === false,
    state,
    getters,
    mutations,
    actions,
    plugins: [createLogger()]
})

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}