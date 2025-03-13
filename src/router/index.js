import { createRouter, createWebHistory } from 'vue-router'
import NavLinks from '../components/NavLinks.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: NavLinks,
        props: { departmentId: 'all' }
    },
    {
        path: '/department/:id',
        name: 'Department',
        component: NavLinks,
        props: route => ({ departmentId: route.params.id })
    },
    // 重定向不存在的路径到首页
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router