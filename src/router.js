import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from './lib/supabase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./components/option3.vue') },
    { path: '/admin/login', component: () => import('./components/admin/login.vue') },
    {
      path: '/admin',
      component: () => import('./components/admin/adminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: 'productos', component: () => import('./components/admin/ProductList.vue') },
        { path: 'productos/nuevo', component: () => import('./components/admin/ProductForm.vue') },
        { path: 'productos/editar/:id', component: () => import('./components/admin/ProductForm.vue') }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router