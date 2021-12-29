<template>
    <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gradient-to-tr from-teal-900 to-teal-600 text-white">
        <thead>
        <tr class="text-left border-b border-gray-300">
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Phone</th>
            <th class="px-4 py-3">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users"
            :key="user.id"
            class="text-left border-b border-gray-300">
            <td class="px-4 py-3">{{ user.name }}</td>
            <td class="px-4 py-3">{{ user.email }}</td>
            <td class="px-4 py-3">{{ user.phone }}</td>
            <td class="px-4 py-3">
                <router-link v-if="isAuthenticated"
                             :to="{name: 'edit', params: { id: user.id }}"
                             class="btn btn-primary">
                    Edit
                </router-link>
                <button v-if="isAuthenticated"
                        class="btn btn-danger"
                        @click.prevent="deleteUser(user.id)">
                    Delete
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts"
        setup>
    import { computed } from 'vue'

    import { useStore } from '@/store'
    import { ActionTypes } from '@/store/actions'
    import { User } from '@/models/user'

    const store = useStore()
    const isAuthenticated = computed((): Boolean => store.getters.isAuthenticated)
    const users = computed((): User[] => store.getters.users)

    const getAllUsers = async (): Promise<void> => {
        await store.dispatch(ActionTypes.FETCH_ALL_USERS)
    }

    const deleteUser = async (id: any): Promise<void> => {
        if (window.confirm('Do you really want to delete?')) {
            await store.dispatch(ActionTypes.DELETE_USER, id)
        }
    }

    getAllUsers()
</script>
