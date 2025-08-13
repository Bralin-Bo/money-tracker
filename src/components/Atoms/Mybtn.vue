<template>
    <button class="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:shadow-lg hover:-translate-y-0.5 h-full">{{ name }}</button>
</template>

<script setup>
defineProps(['name'])
</script>