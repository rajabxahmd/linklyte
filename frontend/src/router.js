import { createRouter, createWebHistory } from 'vue-router'
import { sessionStore } from '@/data/newsession.js'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/alt/:id',
    name: 'alt',
    component: () => import('@/components/test.vue')
  }
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { isLoggedIn } = sessionStore()

  isLoggedIn && (await userResource.promise)

  if (!isLoggedIn) {
    // Redirect to login with the current path in query params
    window.location.href = '/login?redirect-to=/frontend'
  } else {
    next(); // Continue navigation
  }
})


export default router
