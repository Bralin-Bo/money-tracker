<template>
  <div class="relative">
    <Myinput
      :name="props.name"
      :class="props.error ? '!bg-red-100 show-error' : ''"
      :value="input"
      id="myInputRef"
      @input="onInput"
      @keyup.enter="handleEnter"
      @focus="turnOnPanel"
      @blur="turnOffPanel"
    />

    <div
      v-if="panelVisible"
      class="absolute mt-1 z-2 w-full rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto tagPanel"
      style="top: 35px"
    >
      <div
        v-if="input.trim() && !filteredTags.some(t => t.name.toLowerCase() === input.trim().toLowerCase())"
        class="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        @mousedown.prevent="addTag"
      >
        Добавить тег «{{ input.trim() }}»
      </div>

      <div
        v-for="tag in filteredTags"
        :key="tag.id"
        class="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        @mousedown.prevent="selectTag(tag)"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Myinput from '../Atoms/Myinput.vue'
const props = defineProps<{
  tags: { id: number; name: string; color?: string }[]
  selectedTags: { id: number; name: string; color?: string }[]
  name?: string
  error?: boolean
}>()

const emit = defineEmits<{
  (e: 'add-tag', tag: string): void
  (e: 'select-tag', tag: { id: number; name: string }): void
}>()

const input = ref('')
const panelVisible = ref(false)

const filteredTags = computed(() => {
  const query = input.value.trim().toLowerCase()
  if (!panelVisible.value || !query) return props.tags
  return props.tags
    .filter(tag => tag.name.toLowerCase().includes(query))
    .sort((a, b) => {
      const exactA = a.name.toLowerCase() === query
      const exactB = b.name.toLowerCase() === query
      return exactA === exactB ? 0 : exactA ? -1 : 1
    })
})

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  input.value = target.value
}

function handleEnter(e: KeyboardEvent) {
  addTag()
  e.preventDefault()
  turnOffPanel()
  input.value = ''
}

function addTag() {
  const trimmed = input.value.trim()
  if (trimmed) emit('add-tag', trimmed)
  input.value = ''
  blurInput()
}

function selectTag(tag: { id: number; name: string }) {
  emit('select-tag', tag)
  input.value = ''
  turnOffPanel()
  blurInput()
}

function turnOnPanel() {
  panelVisible.value = true
  setTimeout(() => {
    document.querySelector('.tagPanel')?.classList.add('fade-in')
  }, 100)
}

function turnOffPanel() {
  const panel = document.querySelector('.tagPanel')
  panel?.classList.add('fade')
  setTimeout(() => {
    panelVisible.value = false
  }, 350)
}
function blurInput() {
  const myInputRef = document.getElementById('myInputRef')
  myInputRef.blur()
}
</script>
