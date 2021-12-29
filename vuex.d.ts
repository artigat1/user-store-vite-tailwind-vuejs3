import { Store } from 'vuex'
import { AuthenticatedUser } from '@/models/authenticated-user'

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        user: AuthenticatedUser,
        isAuthenticated: boolean,
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}