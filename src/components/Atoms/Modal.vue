<template>
  <transition name="fade">
<div
  v-if="visible"
  class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  @click="close"
>
  <div
    class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-lg mx-2 relative"
    @click.stop
  >
    <!-- Закрыть -->
    <button
      @click="close"
      class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      ✕
    </button>

    <!-- Контент -->
    <slot />
  </div>
</div>

  </transition>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  onOpen: { type: Function, default: null },
  onClose: { type: Function, default: null }
});

const visible = ref(false);

const open = () => {
  visible.value = true;
  if (props.onOpen) props.onOpen(); // вызываем при открытии
};

const close = () => {
  visible.value = false;
  if (props.onClose) props.onClose(); // вызываем при закрытии
};

defineExpose({ open, close });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
