import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/Layout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../components/Logincom.vue')
        },
        {
          path: 'register',
          name: 'home',
          component: () => import('../components/Registercom.vue')
        }
      ]
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoPage.vue')
    }
  ]
})

export default router
