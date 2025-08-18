<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-5 left-1/2 -translate-x-1/2 transform bg-gray-800 text-white text-xl px-4 py-2 rounded-lg shadow-lg z-50"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  duration: { type: Number, default: 2000 },
});

const visible = ref(false);

const show = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};

// Экспортируем метод для родителя
defineExpose({ show });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
