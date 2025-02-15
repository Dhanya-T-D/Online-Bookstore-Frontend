import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/login',
            component: () => import('./components/LoginForm.vue') 
        },
        {
            path:'/reg',
            component: () => import('./components/RegistrationPage.vue') 
        },
        {
            path:'/',
            component: () => import('./components/HomePage.vue') 
        }

    ]
})

export default router;