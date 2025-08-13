<template>
<input class="rounded-lg bg-white text-black p-2 w-full  px-6 py-3 mb-3" 
        type="text"
        :placeholder="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
defineProps(['name', 'modelValue'])
</script>