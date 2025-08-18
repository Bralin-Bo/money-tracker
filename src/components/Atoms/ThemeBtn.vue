<template>
    <!-- <p @click="toggleTheme" class="cursor-pointer hover:scale-120">{{ isDark ? 'Light' : 'Dark' }}</p> -->
    
    <button @click="toggleTheme" class="p-2 rounded-full hover:scale-130 hover:bg-opacity-20 transition-all duration-300 hidden">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-if="!isDark">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-if="isDark">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    </button>
</template>


<script setup>
import { onMounted, ref } from 'vue'

const isDark = ref(false)

onMounted(() => {
  // Проверка локального хранилища
  isDark.value = localStorage.getItem('theme') === 'dark'
  updateHtmlClass()
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateHtmlClass()
}

function updateHtmlClass() {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}
</script>