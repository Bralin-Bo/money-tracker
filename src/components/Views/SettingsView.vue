<template>
    <!-- Main Container -->
    <div class="flex items-start justify-center">
        <div class="w-full max-w-7xl mx-auto px-6 flex items-start justify-between">
            <div class="w-full">
                <p class="text-3xl font-bold text-gray-900 dark:text-white">Настройки</p>
                <div>
                    <p class="mt-8 text-gray-500 dark:text-gray-400">Настройки тегов</p>
                    <div class="flex flex-col md:flex-row gap-3 mt-4">
                        <div class="md:w-100 w:80 flex flex-col rounded-xl border border-[#dce3ee] dark:border-[#2a3442] bg-white dark:bg-[#111518] shadow-lg overflow-hidden">
                            <!-- Поиск -->
                            <div class="p-3 border-b border-[#e4ebf5] dark:border-[#2a3442] bg-[#f7faff] dark:bg-[#14191f]">
                                <input type="text"
                                    class="w-full p-2.5 rounded-lg bg-[#f0f4fa] dark:bg-[#1a1f27] border border-transparent focus:border-[#99ce6a] focus:ring-2 focus:ring-[#99ce6a]/70 text-[#12161c] dark:text-[#e3e7ed] placeholder-[#7c8696] dark:placeholder-[#a7b2c4] transition"
                                    placeholder="Поиск..."
                                    v-model="inputTagShow"
                                    @input="handleTagInput">
                            </div>

                            <!-- Список -->
                            <div class="flex flex-col h-100 overflow-y-auto custom-scroll divide-y divide-[#eef1f6] dark:divide-[#1d242c]">
                                <div v-for="tag in filteredTags" :key="tag.id" 
                                    class="p-3 text-center cursor-pointer border-b border-[#e8ede4] dark:border-[#1a2019] hover:bg-[#dff1d0] dark:hover:bg-[#4c6142] transition-colors wrap-break-word"
                                    @click="handleTagClick(tag)">
                                    {{ tag.name }}
                                </div>
                                <div v-if="filteredTags.length === 0" 
                                    @click="handleTagClick()"
                                    class="p-3 text-center cursor-pointer border-b border-[#e8ede4] dark:border-[#1a2019] hover:bg-[#dff1d0] dark:hover:bg-[#4c6142] transition-colors wrap-break-word"> 
                                    Добавить тег <span class="font-semibold text-accent">{{ inputValue }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-100 w:80 min-h-[300px] p-5 flex flex-col justify-between bg-[#f7faff] dark:bg-[#14191f] rounded-xl shadow-sm border border-[#dce3ee] dark:border-[#2a3442]">
                            <div class="flex flex-col gap-3">
                                <p class="font-semibold text-2xl text-neutral-900 dark:text-white">{{ editMode ? "Редактирование тега" : "Добавление тега" }}</p>

                                <!-- Поле ввода -->
                                <input 
                                    type="text" 
                                    placeholder="Название тега" 
                                    class="p-2 rounded-lg border border-[#dce3ee] dark:border-[#2a3442] bg-white dark:bg-[#111518] focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition w-full"
                                    v-model="currentTag.name"
                                >

                                <!-- Выбор цвета -->
                                <div class="flex items-center gap-2">
                                    <p class="text-neutral-800 dark:text-neutral-300 pl-2">Цвет тега:</p>
                                    <div
                                        @click="showColors = !showColors" 
                                        :class="`${colors[currentTag.color]?.bg} ${colors[currentTag.color]?.hover}`"
                                        class="rounded-full p-2 cursor-pointer border border-[#dce3ee] dark:border-[#2a3442] hover:scale-110 transition"></div>
                                </div>

                                <div class="flex flex-wrap gap-1 px-2 max-w-80" v-if="showColors">
                                    <div  v-for="[name, color] in Object.entries(colors)" :key="name" 
                                    @click="handleColorClick(name)"
                                    :class="color.bg"
                                    class="rounded-full p-3 cursor-pointer border border-[#dce3ee] dark:border-[#2a3442] hover:scale-110 transition"></div>
                                </div>
                            </div>

                            <!-- Кнопки редактирования -->
                            <div class="flex gap-4 mt-4 justify-end" v-if="editMode">
                                <button @click="handleReturnTagButton" class="px-5 py-2.5 bg-yellow-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:bg-yellow-700 active:scale-[0.98] transition-all duration-200">
                                    Назад
                                </button>
                                <button @click="handleDeleteTagButton" class="px-5 py-2.5 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:bg-red-700 active:scale-[0.98] transition-all duration-200">
                                    Удалить
                                </button>
                                <button @click="handleSaveTagButton" class="px-5 py-2.5 bg-accent/85 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:bg-accent/70 active:scale-[0.98] transition-all duration-200">
                                    Сохранить
                                </button>
                            </div>

                            <!-- Кнопка создания -->
                            <div class="mt-4 text-right" v-else>
                                <button @click="handleCreateTagButton" class="px-6 py-2.5 bg-accent/85 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:bg-accent/70 active:scale-[0.98] transition-all duration-200">
                                    Создать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pb-20">
                  <p class="mt-8 text-gray-500 dark:text-gray-400">Ваши данные</p>
                  <div class="mt-4 text-sm">
                    <!-- Перенос данных -->
                    <div class="flex gap-2 my-2 items-center">
                        <p class="min-w-[150px]">Перенос данных:</p>
                        <button
                            @click="handleExportDataButton"
                            class="w-25 px-3 py-1.5 rounded-lg bg-[#4a90e2] text-white shadow-sm 
                                hover:bg-[#357abd] active:bg-[#2f6aa6] 
                                dark:bg-[#5a9ef6] dark:hover:bg-[#3d7fc4] dark:active:bg-[#3269a0] 
                                transition-all duration-200 active:scale-[0.97]">
                            Экспорт
                        </button>
                        <button
                            @click="triggerImport"
                            class="w-25 px-3 py-1.5 rounded-lg 
                                bg-yellow-500 text-white
                                hover:bg-yellow-600
                                dark:bg-yellow-600 dark:hover:bg-yellow-500
                                transition-all duration-200 active:scale-[0.97]">
                            Импорт
                        </button>
                        <!-- Скрытый инпут -->
                        <input
                        ref="fileInput"
                        type="file"
                        accept="application/json"
                        class="hidden"
                        @change="handleImportDataButton"
                        />
                        <!-- Импорт -->
                    </div>

                    <!-- Резервное копирование -->
                    <div class="gap-2 my-2 items-center hidden">
                        <p class="min-w-[150px]">Резервное копирование:</p>
                        <button
                        class="w-25 py-2 rounded-lg font-medium
                                    bg-emerald-500 text-white
                                    hover:bg-emerald-600
                                    dark:bg-emerald-600 dark:hover:bg-emerald-500
                                    transition-colors duration-200"
                        >
                        Сохранить
                        </button>
                        <span class="text-gray-500 dark:text-gray-400 text-xs">(последнее: 29.07.2025)</span>
                    </div>

                    <!-- Удалить данные -->
                    <div class="flex gap-2 my-2 items-center">
                        <p class="min-w-[150px]">Удалить данные:</p>
                        <button
                            @click="handleDeleteAllButton"
                            class="w-25 py-1.5 rounded-lg bg-red-500 text-white shadow-sm 
                                hover:bg-red-600 active:bg-red-700 
                                dark:bg-red-400 dark:hover:bg-red-500 dark:active:bg-red-600 
                                transition-all duration-200 active:scale-[0.97]">
                            Удалить
                        </button>
                    </div>
                </div><div class="pb-20">
                  <p class="mt-8 text-gray-500 dark:text-gray-400">Ваши данные</p>
                  <div class="mt-4 text-sm">
                    <!-- Перенос данных -->
                    <div class="flex gap-2 my-2 items-center">
                        <p class="min-w-[150px]">Сообщить о баге или предложении:</p>
                        <a href="https://t.me/thebralin" class="text-lg text-orange-500 hover:text-orange-600 hover:scale-[1.02]" target="_blank">Бралин Болат</a>
                    </div>
                </div>
                </div>
                </div>
            </div>  
        </div>
        <Modal ref="modal">
            <p class="mb-4  text-2xl opacity-80 text-white">Вы уверены что хотите удалить всё?</p>
            <div class="flex justify-center mt-3 h-12 gap-3">
                <Mybtn name="Отмена" class="w-full !bg-yellow-500 hover:bg-yellow-600 hover:shadow-yellow-500/30" @click="closeModal"/>
                <Mybtn name="Удалить" class="w-full !bg-rose-500 hover:bg-rose-600 hover:shadow-rose-500/30" @click="deleteAll"/>
            </div>
        </Modal>
        <Toast ref="toast" :message="toastMessage" />
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTransactionStore } from '../../stores/transactions';
import { useBankStore } from '../../stores/bank'
import { useRouter } from 'vue-router';
import Modal from '../Atoms/Modal.vue';
import Mybtn from '../Atoms/Mybtn.vue';
import { getRandomColor } from '../../utils/randomColor';
import Toast from '../Atoms/Toast.vue';

const bankStore = useBankStore()
const tStore = useTransactionStore()
const currentTag = ref({})
const inputTagShow = ref('')
const inputValue = ref('')
const editMode = ref(false)
const showColors = ref(false)
const router = useRouter()

const modal = ref(null);

const openModal = () => modal.value.open();
const closeModal = () => modal.value.close();

const fileInput = ref(null)
const setCurrentTag = (tagId) => {
    currentTag.value = tStore.tags.find(tag => tag.id === tagId)
}
const filteredTags = computed(() => {
  const input = inputValue.value.trim().toLowerCase()

  if (input === '') return tStore.tags

  return tStore.tags
    .filter(tag => tag.name.toLowerCase().includes(input))
    .sort((a, b) => {
      const aLower = a.name.toLowerCase()
      const bLower = b.name.toLowerCase()
      const exactA = aLower === input
      const exactB = bLower === input

      if (exactA && !exactB) return -1
      if (!exactA && exactB) return 1
      return 0
    })
})
const colors = {
  red:      { bg: 'bg-red-400',       hover: 'hover:bg-red-600' },
  green:    { bg: 'bg-green-400',     hover: 'hover:bg-green-600' },
  blue:     { bg: 'bg-blue-400',      hover: 'hover:bg-blue-600' },
  indigo:   { bg: 'bg-indigo-400',    hover: 'hover:bg-indigo-600' },
  yellow:   { bg: 'bg-yellow-400',    hover: 'hover:bg-yellow-600' },
  purple:   { bg: 'bg-purple-400',    hover: 'hover:bg-purple-600' },
  pink:     { bg: 'bg-pink-400',      hover: 'hover:bg-pink-600' },
  rose:     { bg: 'bg-rose-400',      hover: 'hover:bg-rose-600' },
  orange:   { bg: 'bg-orange-400',    hover: 'hover:bg-orange-600' },
  amber:    { bg: 'bg-amber-400',     hover: 'hover:bg-amber-600' },
  lime:     { bg: 'bg-lime-400',      hover: 'hover:bg-lime-600' },
  teal:     { bg: 'bg-teal-400',      hover: 'hover:bg-teal-600' },
  cyan:     { bg: 'bg-cyan-400',      hover: 'hover:bg-cyan-600' },
  sky:      { bg: 'bg-sky-400',       hover: 'hover:bg-sky-600' },
  emerald:  { bg: 'bg-emerald-400',   hover: 'hover:bg-emerald-600' },
  fuchsia:  { bg: 'bg-fuchsia-400',   hover: 'hover:bg-fuchsia-600' },
  violet:   { bg: 'bg-violet-400',    hover: 'hover:bg-violet-600' },
  slate:    { bg: 'bg-slate-400',     hover: 'hover:bg-slate-600' },
  neutral:  { bg: 'bg-neutral-400',   hover: 'hover:bg-neutral-600' },
  zinc:     { bg: 'bg-zinc-400',      hover: 'hover:bg-zinc-600' },
  stone:    { bg: 'bg-stone-400',     hover: 'hover:bg-stone-600' },
  gray:     { bg: 'bg-gray-400',      hover: 'hover:bg-gray-600' }
}


const changeInputTag = (newVal, show) => {
    if(show) {
        inputTagShow.value = newVal
        return
    }
    inputValue.value = newVal
}

const deleteAll =()=> {
    tStore.clearAll()
    bankStore.amount = 0
    bankStore.saveToLocalStorage()
    router.push('/')
}


const handleTagInput = () => {
    changeInputTag(inputTagShow.value)
}
const handleTagClick = (tag) => {
    changeInputTag('', true)
    if(!tag){
        editMode.value = false
        currentTag.value = {
            name: inputValue.value,
            color: getRandomColor()} 
    }
    else{
        editMode.value = true
        currentTag.value = tag
    }
    changeInputTag('')
}

const handleCreateTagButton = () => {

    if(!currentTag.value.name){
        console.log("tag is empty");
        return
    }
    const inputName = currentTag.value.name.trim().toLowerCase()

    if(tStore.tags.find(tag => tag.name.toLowerCase() === inputName)){
        console.log("tag exists");
        return
    }

    tStore.createTag(currentTag.value)
    editMode.value = false
    currentTag.value = {color: getRandomColor()}
}

const handleDeleteTagButton = () => {
  editMode.value = false
  tStore.deleteTag(currentTag.value.id)
  tStore.deleteTagFromTransactions(currentTag.value.id) // 🆕
  currentTag.value = { color: getRandomColor() }
  toastMessage.value = "Тег удален!"
  showToast()
}

const handleSaveTagButton = () => {
  editMode.value = false
  tStore.updateTag(currentTag.value.id, currentTag.value.name, currentTag.value.color)
  tStore.updateTagInTransactions(currentTag.value.id, currentTag.value.name, currentTag.value.color) // 🆕
  currentTag.value = { color: getRandomColor() }
  toastMessage.value = "Тег успешно обновлен!"
  showToast()
}

const handleReturnTagButton = () => {
    editMode.value = false
    currentTag.value = {color: getRandomColor()}
}

const handleColorClick = (name) => {
    currentTag.value.color = name
    showColors.value = false
}
const handleDeleteAllButton = () => {
    openModal()
}
const handleExportDataButton = () => {
    exportAllData()
}
const handleImportDataButton = (e) => {
    importAllData(e)
    router.push('/')
}
const triggerImport = () => {
    fileInput.value.click()
}
// 📤 Экспорт всех данных в JSON
function exportAllData() {
  const allData = {
    bank: { amount: bankStore.amount },
    transactions: {
      tags: tStore.tags,
      tagIdCounter: tStore.tagIdCounter,
      transactions: tStore.transactions
    }
  }

  const json = JSON.stringify(allData, null, 2)

// Формат даты: дд.мм.гггг
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const dateStr = `${day}.${month}.${year}`

  // Скачиваем как файл
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `backup_${dateStr}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// 📥 Импорт данных из JSON файла
function importAllData(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)

      // Заполняем банк
      if (data.bank && typeof data.bank.amount === 'number') {
        bankStore.amount = data.bank.amount
        bankStore.saveToLocalStorage()
      }

      // Заполняем теги и транзакции
      if (data.transactions) {
        if (Array.isArray(data.transactions.tags)) {
          tStore.tags = data.transactions.tags
          tStore.tagIdCounter = data.transactions.tagIdCounter || 0
          tStore.saveTagsToLocalStorage()
        }
        if (Array.isArray(data.transactions.transactions)) {
          tStore.transactions = data.transactions.transactions
          tStore.saveToLocalStorage()
        }
      }

    } catch (err) {
      console.error('Ошибка при импорте данных:', err)
    }
  }
  reader.readAsText(file)
}
onMounted(() => {
    currentTag.value.color = getRandomColor()
})



const toastMessage = ref("Это уведомление!");
const toast = ref(null);
const showToast = () => {
  toast.value.show();
};
</script>
<style> 
        .custom-scroll {
            scrollbar-width: thin;
            scrollbar-color: var(--secondary) transparent;
        }

        .custom-scroll::-webkit-scrollbar {
            width: 8px;
        }

        .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
            background-color: var(--secondary);
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
            background-color: var(--accent);
        }
</style>