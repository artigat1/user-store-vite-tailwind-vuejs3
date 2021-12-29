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
    import { computed, Ref, ref, UnwrapRef } from 'vue'
    import { useStore } from 'vuex'

    import { deleteUserById, getUsers } from '@/api/users.db'
    import { key } from '@/store'
    import { User } from '@/models/user'

    const store = useStore(key)
    let users: Ref<UnwrapRef<User[]>> = ref([])
    const isAuthenticated = computed((): Boolean => store.getters.isAuthenticated)

    const getAllUsers = async (): Promise<void> => {
        console.log('getting users')
        try {
            const response = await getUsers()
            console.log({ response })
            users.value = response
        } catch (error) {
            console.error(error)
        }
    }
    const deleteUser = async (id: any): Promise<void> => {
        if (window.confirm('Do you really want to delete?')) {
            try {
                await deleteUserById(id)
                users.value = users.value.filter(u => u.id !== id)
            } catch (error) {
                console.error(error)
            }
        }
    }

    getAllUsers()
</script>
