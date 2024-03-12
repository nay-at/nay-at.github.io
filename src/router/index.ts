import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
    /* {
      path: '/2-1-1-2.github.io/',
      name: 'Home',
      component: HomeView
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: HomeView }
     */ /* {
      path: '/2-1-1-2.github.io/:queryParams(.*)',
      name: 'Result',
      component: Result,
      props: true
    } */
  ]
})

export default router
