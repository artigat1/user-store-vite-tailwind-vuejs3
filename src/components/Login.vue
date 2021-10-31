<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <form @submit.prevent="userLogin">
                <h3>Sign In</h3>

                <div class="form-group">
                    <label>Email address</label>
                    <input v-model="email"
                           class="form-control form-control-lg"
                           type="email" />
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input v-model="password"
                           class="form-control form-control-lg"
                           type="password" />
                </div>

                <div v-if="errorMessage">{{ errorMessage }}</div>

                <button class="btn btn-dark btn-lg btn-block"
                        type="submit">Sign In
                </button>

                <p class="forgot-password text-right mt-2 mb-4">
                    <router-link to="/forgot-password">Forgot password ?</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts"
        setup>
    import { computed, ref, watch } from 'vue'
    import { useStore } from 'vuex'

    import { login } from '@/api/login.auth'
    import { key } from '../store'
    import router from '../router'

    const store = useStore(key)
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const isAuthenticated = computed((): Boolean => store.getters.isAuthenticated)

    watch(() => isAuthenticated, (newValue): void => {
        if (newValue) {
            router.push('/list')
        }
    })

    const userLogin = async () => {
        try {
            await login(email.value, password.value)
        } catch (error) {
            console.error(error)
            errorMessage.value = `${ error.code }: ${ error.message }`
        }
    }
</script>