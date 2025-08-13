<template>
    <RouterLink :to="link" class="font-bold nav-link" :class="isActive ? 'text-blue-200' : 'text-white'">{{ name }}</RouterLink>
</template>


<script setup>
const props = defineProps(['name', 'link'])

import { useRoute } from 'vue-router'

import { computed } from 'vue'

const route = useRoute()
const isActive = computed(() => route.name == props.name)
</script>

<style>
.nav-link {
    position: relative;
    transition: all 0.3s ease;
}

.nav-link:hover {
    transform: translateY(-1px);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
}
        
.nav-link:hover::after {
    width: 100%;
}
</style>