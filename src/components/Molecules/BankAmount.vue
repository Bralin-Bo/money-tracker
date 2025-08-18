<template>
    <div class="flex-1 flex items-center justify-center slide-in">
    <div class="relative">
        <div class="w-80 h-80 overflow-hidden rounded-full bg-emerald-700 pulse-animation flex flex-col items-center justify-center">
            <div class="text-center">
                <p class="text-lg font-light opacity-80 mb-2">Ваш кошелек:</p>
                <p :class="bank.amount > 100000 ? 'text-5xl' : 'text-6xl'" class="font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {{ displayedAmount}}тг
                </p>
            </div>
        </div>
        
        <!-- Decorative Elements -->
        <div class="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 up-down-anim "></div>
        <div class="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-400 rounded-full opacity-40 up-down-anim2 "></div>
        <div class="absolute top-1/2 -left-8 w-6 h-6 bg-green-400 dark:bg-white rounded-full opacity-30 up-down-anim3 "></div>
    </div>
</div>

</template>
<script setup>
import { ref, watch } from 'vue';
import { useBankStore } from '../../stores/bank';

const bank = useBankStore()
const displayedAmount = ref(bank.amount)
watch(
  () => bank.amount, // getter-функция, отслеживает реактивно
  (newVal, oldVal) => {
    const duration = 500
    const frameRate = 60
    const steps = Math.floor(duration / (1000 / frameRate)) || 1
    const increment = (newVal - oldVal) / steps
    let current = oldVal
    let count = 0

    const animate = () => {
      if (count >= steps) {
        displayedAmount.value = newVal
        return
      }
      current += increment
      displayedAmount.value = Math.round(current)
      count++
      requestAnimationFrame(animate)
    }

    animate()
  }
)
</script>
<style>

.pulse-animation {
    animation: pulse 3s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.up-down-anim {
    animation: upDown 5s infinite;
}
.up-down-anim2 {
    animation: upDown 7s infinite;
}
.up-down-anim3 {
    animation: upDown 4s infinite;
}

@keyframes upDown {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
}

.slide-in {
    animation: slideIn 0.8s ease-out;
}

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
}

        
</style>