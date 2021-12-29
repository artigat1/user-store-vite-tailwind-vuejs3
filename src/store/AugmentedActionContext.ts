import { ActionContext } from 'vuex'
import { Mutations } from '@/store/mutations'
import { State } from '@/store/state'

export type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;
