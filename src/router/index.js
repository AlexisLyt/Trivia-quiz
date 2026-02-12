import { createRouter, createWebHistory } from 'vue-router'
import QuestionView from '@/views/QuestionView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/Trivia-Quiz/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Trivia-Quiz/quiz/:amount',
    name: 'Quiz',
    component: QuestionView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
