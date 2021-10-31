import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import { store } from '@/store'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated

    if (isAuthenticated) {
        // If authenticated, then user can go anywhere
        next()
    } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
        // If the page doesn't require authentication, then user can view it
        next()
    } else {
        // Otherwise go to the login page
        next('/login')
    }
})

export default router