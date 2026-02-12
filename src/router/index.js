import { createRouter, createWebHistory } from 'vue-router'
import QuestionView from '@/views/QuestionView.vue'

const routes = [
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuestionView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router