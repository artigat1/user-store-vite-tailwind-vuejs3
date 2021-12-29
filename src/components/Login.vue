<template>
    <div class="flex items-top justify-center">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 class="text-2xl font-bold text-center">Login to your account</h3>
            <form @submit.prevent="userLogin">
                <div class="mt-4">
                    <label class="block"
                           for="email">
                        Email
                    </label>
                    <input id="email"
                           v-model="email"
                           class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                           placeholder="Email"
                           type="email" />
                </div>
                <div class="mt-4">
                    <label class="block"
                           for="password">
                        Password
                    </label>
                    <input id="password"
                           v-model="password"
                           class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                           placeholder="Password"
                           type="password" />
                </div>
                <div class="flex items-baseline justify-between">
                    <button class="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-gray-200 hover:text-teal-600"
                            type="submit">
                        Login
                    </button>
                    <a class="text-sm text-teal-600 hover:underline"
                       href="#">
                        Forgot password?
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts"
        setup>
    import { computed, ref, watch } from 'vue'

    import { login } from '@/api/login.auth'
    import { useStore } from '@/store'
    import router from '../router'

    const store = useStore()
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