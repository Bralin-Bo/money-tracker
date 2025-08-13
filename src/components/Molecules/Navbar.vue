<script setup lang="ts">
import Logo from '../Atoms/Logo.vue';
import Mylink from '../Atoms/Mylink.vue';
import ThemeBtn from '../Atoms/ThemeBtn.vue';


</script>

<template>
    <div class="fixed text-white w-full z-5">
        <div class="px-4 py-5 flex justify-between 
        border-3 border-t-0 border-primary rounded-b-2xl max-w-7xl mx-auto z-50 
        circle-glow glass-effect">
            <div class="flex gap-2 items-center">
                <Logo />
                <ThemeBtn />
            </div>
            <div class="flex gap-3 items-center">
                <Mylink name="Главная" link="/"/>
                <Mylink name="Статистика" link="/stat"/>
                <Mylink name="Настройки" link="/settings"/>
                <Mylink name="Тест" link="/test"/>
            </div>
        </div>
    </div>
</template>

<style>

.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.glass-effect {
    backdrop-filter: blur(20px);
    background: rgba(102, 126, 234, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.7);
}
.dark .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.circle-glow {
    box-shadow: 0 0 80px rgba(102, 126, 234, 0.8);
}
.dark .circle-glow {
    box-shadow: 0 0 80px rgba(102, 126, 234, 0.3);
}
</style>