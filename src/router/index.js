import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/all/1'
    },
    {
        path: '/all/:pageNumber',
        name: 'all',
        component: () => import('@/views/RSSAll')
    },
    {
        path: '/mos/:pageNumber',
        name: 'mos',
        component: () => import('@/views/RSSMos')
    },
    {
        path: '/ria/:pageNumber',
        name: 'ria',
        component: () => import('@/views/RSSRia')
    },
    {
        path: '**',
        name: '404',
        component: () => import('@/views/RSS404')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
