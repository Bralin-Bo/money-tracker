<template>
  <div v-if="showWelcome" class="welcome-overlay">
    <!-- Декоративный элемент на фоне -->
    <div class="background-blob" :style="blobStyle"></div>

    <div class="welcome-container">
      <transition name="fade-scale" mode="out-in">
        <div :key="currentSlide" class="slide">
          <h1>{{ slides[currentSlide].title }}</h1>
          <p>{{ slides[currentSlide].text }}</p>
          <a  v-if="slides[currentSlide].title === 'Важное уточнение 🚀'"
            href="https://t.me/thebralin" class="text-lg text-orange-500 hover:text-orange-600 hover:scale-[1.02]" target="_blank">Бралин Болат</a>
          <!-- Кастомный контент для слайда с настройками -->
          <div v-if="slides[currentSlide].type === 'settings'" class="settings-content">
            <label for="amount-input">Сумма:</label>
            <input id="amount-input" type="number" v-model="amount" />

            <label for="tags-input">Теги:</label>
            <div class="flex">
                <div class="p-3 rounded-tl-lg rounded-bl-lg  cursor-pointer w-50"
                    :class="!tagsPack ? 'bg-emerald-600' : 'bg-gray-700'"
                    @click="tagsPack = !tagsPack">Сам создам</div>
                <div class="p-3 rounded-tr-lg rounded-br-lg cursor-pointer w-50"
                    :class="tagsPack ? 'bg-emerald-600' : 'bg-gray-700'"
                    @click="tagsPack = !tagsPack">Базовый набор</div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Индикаторы прогресса -->
      <div class="progress-dots">
        <span
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: index === currentSlide }"
          class="dot"
        ></span>
      </div>

      <!-- Навигация -->
      <div class="controls">
        <button v-if="currentSlide > 0" @click="prevSlide" class="btn-secondary">Назад</button>
        <button v-if="currentSlide < slides.length - 1" @click="nextSlide" class="btn-primary">Далее</button>
        <button v-else @click="finish" class="btn-primary">Начать</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useBankStore } from "../../stores/bank"
import { useTransactionStore } from "../../stores/transactions"

const slides = ref([
  { title: "Добро пожаловать! ✨", text: "My Money(тестовое название) поможет вам отслеживать свою финансовую жизнь. Надеюсь оно принесет вам пользу!", type: "text" },
  { title: "Важное уточнение 🚀", text: "Приложение сейчас в раннем тестирований, представлен самый базовый функционал, спасибо за понимание. Если нашли баги или есть предложение то пишите мне в телеграм:", type: "text" },
  { title: "Быстрая настройка ⚙️", text: "Введите сколько у вас на балансе.(Все данные хранятся в вашем браузере). И при желании можете использовать базовый набор тегов.", type: "settings" },
  { title: "Все готово! 🎉", text: "Приятной работы!", type: "text" },
])

const currentSlide = ref(0)
const showWelcome = ref(true)
const amount = ref(0) // пример состояния для input
const bankStore = useBankStore()
const tStore = useTransactionStore()
const tagsPack = ref(true)
const tags = [
      {
        "name": "еда и напитки",
        "color": "orange"
      },
      {
        "name": "транспорт",
        "color": "sky"
      },
      {
        "name": "жильё",
        "color": "neutral"
      },
      {
        "name": "развлечения",
        "color": "indigo"
      },
      {
        "name": "здоровье",
        "color": "green"
      },
      {
        "name": "покупки",
        "color": "pink"
      },
      {
        "name": "счета и платежи",
        "color": "yellow"
      },
      {
        "name": "подписки",
        "color": "purple"
      }
    ]
// Позиции для декоративного круга для каждого слайда
const blobPositions = [
  { top: '-20%', left: '-20%', transform: 'scale(1)' },
  { top: '60%', left: '70%', transform: 'scale(1.2)' },
  { top: '-15%', left: '65%', transform: 'scale(0.9)' },
  { top: '50%', left: '-25%', transform: 'scale(1.1)' },
];

// Вычисляемое свойство для стилей круга в зависимости от текущего слайда
const blobStyle = computed(() => {
  return blobPositions[currentSlide.value];
});


onMounted(() => {
  // Раскомментируйте, чтобы скрыть приветствие для вернувшихся пользователей
  if (localStorage.getItem("visited")) {
    showWelcome.value = false
  }
})

function nextSlide() {
  if (currentSlide.value < slides.value.length - 1) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function finish() {
  showWelcome.value = false
  localStorage.setItem("visited", "true")
  bankStore.amount = amount.value
  bankStore.saveToLocalStorage()
  tags.forEach(tag => tStore.createTag(tag))
}
</script>

<style scoped>
/* --- Основной контейнер --- */
.welcome-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Минималистичный темный фон */
  background: #121212;
  color: #ecf0f1;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden; /* Прячем части круга, выходящие за пределы экрана */
}

/* --- Декоративный круг --- */
.background-blob {
  position: absolute;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(46, 204, 113, 0.2) 0%, rgba(52, 152, 219, 0.15) 50%, rgba(18, 18, 18, 0) 70%);
  border-radius: 50%;
  filter: blur(80px);
  transition: top 1s ease-in-out, left 1s ease-in-out, transform 1s ease-in-out;
  will-change: top, left, transform;
  z-index: 1; /* Размещаем под контентом */
}

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 30px;
  width: 90%;
  max-width: 500px;
  min-height: 380px;
  text-align: center;
  position: relative; /* Необходимо для z-index */
  z-index: 2; /* Размещаем над кругом */
}

/* --- Стили слайда --- */
.slide {
  width: 100%;
  min-height: 150px; /* Фиксированная высота для контента, чтобы кнопки не прыгали */
}

.slide h1 {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #ffffff;
}

.slide p {
  font-size: 1.1rem;
  color: #bdc3c7;
  line-height: 1.6;
  max-width: 350px;
  margin: 0 auto;
}

/* --- Стили для инпутов --- */
.settings-content {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.settings-content label {
  font-size: 1rem;
  color: #bdc3c7;
}

.settings-content input {
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #34495e;
  background-color: #2c3e50;
  color: #ecf0f1;
  font-size: 1rem;
  width: 100px;
  text-align: center;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.settings-content input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}

/* --- Анимация --- */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.05) translateY(-10px);
}

/* --- Индикаторы прогресса (точки) --- */
.progress-dots {
  display: flex;
  gap: 10px;
  margin: 25px 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.dot.active {
  background-color: #3498db;
  transform: scale(1.2);
}

/* --- Стили кнопок навигации --- */
.controls {
  margin-top: auto; /* Прижимает кнопки к низу */
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: center;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  min-width: 120px;
}

.btn-primary {
  background-color: #3498db;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid #566573;
}

.btn-secondary:hover {
  background-color: #34495e;
  border-color: #34495e;
  transform: translateY(-2px);
}
</style>
