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
        },
        {
            path:'/publisherhome',
            name: 'publisher-home', 
            component: () => import('./components/PublisherHomepage.vue')
        },
        {
            path:'/addbook',
            component: () => import('./components/AddbookForm.vue') 
        },
        {
            path:'/userhomepage',
            component: () => import('./components/UserHomepage.vue') 
        },
        {
            path:'/adminhomepage',
            component: () => import('./components/AdminHomepage.vue') 
        },
        {
            path:'/publishermanagement',
            component: () => import('./components/PublisherManagement.vue') 
        },
        {
            path:'/chart',
            component: () => import('./components/ActivityChart.vue') 
        },
        {
            path:'/restuser',
            component: () => import('./components/RestUser.vue') 
        },
        {
            path:'/jerm',
            component: () => import('./components/JerM.vue') 
        },
        {
            path:'/foodlist',
            component: () => import('./components/FoodList.vue') 
        },

        {
            path:'/publisherProfileUpdation',
            component: () => import('./components/PublisherProfileUpdate.vue') 
        },
        {
            path:'/addToCart',
            component: () => import('./components/AddToCart.vue') 
        },
        {
            path:'/buyNow',
            component: () => import('./components/BuyNowDialog.vue') 
        },
    
    ]
})



export default router;