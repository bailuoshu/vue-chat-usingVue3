import {createRouter, RouteRecordRaw, Router, createWebHistory} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register.vue'),
        meta: {
            title: '注册'
        }
    },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to,from,next)=>{
    // 根据路由元信息设置文档标题
    window.document.title = to.meta.title
    if (to.path === '/login'||to.path ==='/register') return next()
    const tokenStr = localStorage.getItem('vc_token')
    if (!tokenStr) return next('/login')
    next()
})

export default router