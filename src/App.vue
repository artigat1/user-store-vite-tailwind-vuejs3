<template>
<!--    <nav class="flex items-center justify-between flex-wrap bg-teal p-6">-->
<!--        <div class="flex items-center flex-no-shrink text-white mr-6">-->
<!--            <svg class="h-8 w-8 mr-2"-->
<!--                 height="54"-->
<!--                 viewBox="0 0 54 54"-->
<!--                 width="54"-->
<!--                 xmlns="http://www.w3.org/2000/svg">-->
<!--                <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />-->
<!--            </svg>-->
<!--            <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>-->
<!--        </div>-->
<!--        <div class="block lg:hidden">-->
<!--            <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">-->
<!--                <svg class="h-3 w-3"-->
<!--                     viewBox="0 0 20 20"-->
<!--                     xmlns="http://www.w3.org/2000/svg">-->
<!--                    <title>Menu</title>-->
<!--                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />-->
<!--                </svg>-->
<!--            </button>-->
<!--        </div>-->
<!--        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">-->
<!--            <div class="text-sm lg:flex-grow">-->
<!--                <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"-->
<!--                   href="#responsive-header">-->
<!--                    Docs-->
<!--                </a>-->
<!--                <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"-->
<!--                   href="#responsive-header">-->
<!--                    Examples-->
<!--                </a>-->
<!--                <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white"-->
<!--                   href="#responsive-header">-->
<!--                    Blog-->
<!--                </a>-->
<!--            </div>-->
<!--            <div>-->
<!--                <a class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"-->
<!--                   href="#">Download</a>-->
<!--            </div>-->
<!--        </div>-->
<!--    </nav>-->


    <nav class="flex justify-between px-6 py-4 bg-gradient-to-tr from-teal-900 to-teal-400 items-center">
        <div class="flex items-center space-x-2">
            <div class="flex items-center flex-no-shrink text-white mr-6">
                <a class="font-semibold text-xl tracking-tight">Firebase Vue CRUD Example</a>
            </div>
        </div>
        <div class="flex items-center space-x-6">
            <div v-if="isAuthenticated">
                <div class="flex flex-grow items-center px-3 py-2 border rounded text-white border-teal-light hover:text-white hover:border-white">
                    {{ authUserEmail }} (last login: {{ lastLoginAt }})
                </div>
            </div>

            <ul class="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-white text-lg">
                <li v-if="!isAuthenticated"
                    class="lg:flex-grow">
                    <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                                 to="/login">Sign In
                    </router-link>
                </li>
                <li v-if="isAuthenticated"
                    class="lg:flex-grow">
                    <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                       @click.prevent="onLogout">Sign Out</a>
                </li>
                <li v-if="isAuthenticated"
                    class="lg:flex-grow">
                    <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                                 to="/add">Add User
                    </router-link>
                </li>
                <li class="lg:flex-grow">
                    <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                                 to="/list">View Users
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container mx-auto">
        <router-view />
    </div>
</template>

<script lang="ts"
        setup>
    import { computed } from 'vue'
    import { format, utcToZonedTime } from 'date-fns-tz'

    import { useStore } from './store'
    import { AuthenticatedUser } from './models/AuthenticatedUser'
    import { logout } from './api/login.auth'
    import router from './router'

    const store = useStore()

    const isAuthenticated = computed((): Boolean => store.getters.isAuthenticated)
    const authenticatedUser = computed((): AuthenticatedUser => store.getters.authenticatedUser)
    const authUserEmail = computed((): string => authenticatedUser.value?.email)

    const lastLoginAt = computed((): string => {
        const lastLoginTimestamp = authenticatedUser.value?.lastLoginAt
        if (lastLoginTimestamp) {
            const timestamp = new Date(lastLoginTimestamp.replace(/GMT.*$/, 'GMT+0000')).toISOString()
            const zonedTimestamp = utcToZonedTime(timestamp, 'Europe/London')
            return format(zonedTimestamp, 'yyyy-MM-dd HH:mm')
        }
        return ''
    })

    const onLogout = async () => {
        await logout()
        await router.push('/')
    }
</script>