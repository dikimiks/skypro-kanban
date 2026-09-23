import { createRouter, createWebHistory } from 'vue-router'

// Импорт страниц
import BoardPage from '../views/BoardPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CardPage from '../views/CardPage.vue'
import AddCardPage from '../views/AddCardPage.vue'
import ExitPage from '../views/ExitPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

// Проверка авторизации
const isAuthenticated = () => {
  return localStorage.getItem('isAuth') === 'true'
}

// Маршруты
const routes = [
  {
    path: '/',
    name: 'Board',
    component: BoardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { guestOnly: true }
  },
  {
    path: '/card/:id',
    name: 'Card',
    component: CardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-card',
    name: 'AddCard',
    component: AddCardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/exit',
    name: 'Exit',
    component: ExitPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Навигационный guard
router.beforeEach((to, from, next) => {
  const auth = isAuthenticated()
  
  if (to.meta.requiresAuth && !auth) {
    next('/login')
  }
  else if (to.meta.guestOnly && auth) {
    next('/')
  }
  else {
    next()
  }
})

export default router