import { createRouter, createWebHistory } from 'vue-router'
import QuestionView from '@/views/QuestionView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/quiz/:amount',
    name: 'Quiz',
    component: QuestionView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
