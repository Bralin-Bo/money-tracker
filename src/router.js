
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './components/Views/HomeView.vue'
import StatView from './components/Views/StatView.vue'
import SettingsView from './components/Views/SettingsView.vue'
import Test from './components/Views/Test.vue'

const routes = [
  { path: '/', component: HomeView, name: 'Главная' },
  { path: '/stat', component: StatView, name: 'Статистика' },
  { path: '/settings', component: SettingsView, name: 'Настройки' },
  { path: '/Test', component: Test, name: 'Тест' },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
