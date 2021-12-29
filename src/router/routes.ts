const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/login.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/add',
        name: 'add',
        component: () => import('../components/UserList.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('../components/UserEdit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:path(.*)',
        name: 'list',
        component: () => import('../components/UserList.vue'),
        meta: {
            requiresAuth: false,
        },
    },
]

export default routes