<script setup lang="ts">
import Logo from '../Atoms/Logo.vue';
import Mylink from '../Atoms/Mylink.vue';
import ThemeBtn from '../Atoms/ThemeBtn.vue';


</script>

<template>
    <!-- Десктоп версия -->
    <div 
        class="hidden md:flex fixed text-white h-screen z-50 items-center py-20 pl-10"
    >
        <div 
        class="px-4 py-5 flex justify-between flex-col
        border-2 border-primary rounded-2xl 
        bg-gray-800 h-full"
        >
        <div class="flex gap-3 items-center flex-col">
            <Logo />
            <Mylink name="Главная" link="/"/>
            <Mylink name="История" link="/transactions"/>
            <Mylink name="Статистика" link="/stat"/>
            <Mylink name="Настройки" link="/settings"/>
            <div class="flex gap-2 items-center hidden"> <ThemeBtn /> </div>
        </div>
        </div>
    </div>

    <!-- Мобильная версия -->
    <div 
        class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-800 border-t-2 py-5 border-primary"
    >
        <div class="flex justify-around items-center py-2">
        <Mylink name="Главная" link="/"/>
        <Mylink name="История" link="/transactions"/>
        <Mylink name="Статистика" link="/stat"/>
        <Mylink name="Настройки" link="/settings"/>
        <div class="flex gap-2 items-center hidden"> <ThemeBtn /> </div>
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