<template>
    <div class="flex items-top justify-center">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 class="text-2xl font-bold text-center">Edit user</h3>
            <form @submit.prevent="updateUser">
                <div class="mt-4">
                    <label class="block"
                           for="email">
                        Email
                    </label>
                    <input id="email"
                           v-model="email"
                           disabled="disabled"
                           class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                           placeholder="Email"
                           type="email" />
                </div>
                <div class="mt-4">
                    <label class="block"
                           for="name">
                        Name
                    </label>
                    <input id="name"
                           v-model="name"
                           class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                           placeholder="Name"
                           type="text" />
                </div>
                <div class="mt-4">
                    <label class="block"
                           for="name">
                        Phone number
                    </label>
                    <input id="phone"
                           v-model="phone"
                           class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                           placeholder="Phone number"
                           type="text" />
                </div>
                <div class="flex items-baseline justify-between">
                    <button class="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-gray-200 hover:text-teal-600"
                            type="submit">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import {
        computed,
        ref
    } from 'vue'

    import { useStore } from '@/store'
    import { ActionTypes } from '@/store/actions'

    const store = useStore()
    const route = useRoute()
    const userId: string | string[] = route.params.id
    const user = computed(store.getters.getUserById(userId))
    const name = computed(() => ({
        get() {
            console.log('name get', user.value)
            return user.name.value
        },
    }))
    
    console.log({ user })
    console.log({userId})
    
    const updateUser = async () => {
        await store.dispatch(ActionTypes.UPDATE_USER, {
            id: userId,
            name: name,
            phone: phone.value,
            email: email.value,
        })
    }
</script>
