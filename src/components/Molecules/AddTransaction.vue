<script setup lang="ts">
import Mybtn from '../Atoms/Mybtn.vue';
import Myinput from '../Atoms/myinput.vue';
import { useBankStore } from '../../stores/bank';
import { computed, ref } from 'vue';
import { useTransactionStore } from '../../stores/transactions';
import TagBtn from '../Atoms/TagBtn.vue';
import TagInput from './TagInput.vue';
import { getRandomColor } from '../../utils/randomColor';

const bank = useBankStore()
const tStore = useTransactionStore()
const today = new Date().toISOString().split('T')[0]
const inputsData = ref({amount:null, date: today, tags: []})
const inputTag = ref('')
const errors = ref({amount: false, tags: false})
const tagsPanelOn = ref(false)

// Фильтрация тегов 
const filteredTags = computed(() => {
  if (!tagsPanelOn.value) return []

  const input = inputTag.value.trim().toLowerCase()

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


// Добавить транзакцию и обновить счет
const makeOperation = (positive) => {

    // Валидация
    if(inputsData.value.amount==null || isNaN(inputsData.value.amount)) {
        errors.value.amount = true
        setTimeout(() => {
            errors.value.amount = false
        }, 1000);
        return
    }

    // Добавление тега если забыли добавить сами
    if(inputTag.value !== '' ){
        handleTag()
        inputTag.value = ''
    } 

    // Создание транзакции в общей базе
    tStore.createTransaction({
        tags: inputsData.value.tags,
        amount: inputsData.value.amount,
        positive,
        date: inputsData.value.date,
    })

    // Обновление счёта
    if(positive){
        bank.add(inputsData.value.amount)
    }else{
        bank.subtract(inputsData.value.amount)
    }

    // Возвращение значений
    inputsData.value = {amount:null, date: today, tags: []}
}

// При нажатий Enter добавлять тег
// const handleTag = ()=>{
//     // Если тег не создан в принципе
//     if(!tStore.isTagsExist(inputTag.value.trim().toLowerCase())){
//         tStore.createTag(inputTag.value.trim().toLowerCase())
//     } 
    
//     // Если тег есть в списке создания
//     if(inputsData.value.tags.includes(inputTag.value.trim().toLowerCase())) {
//         const tagBtn = document.querySelector(`.tag-${inputTag.value}`)

//         // Анимация тега когда пользователь вводит существующий тег
//         tagBtn.classList.add('focus')
//         setTimeout(() => {
//             tagBtn.classList.remove('focus')
//         }, 1000);
//         inputTag.value = ''
//         return
//     }

//     // Добавить тег в список тегов транзакции
//     inputsData.value.tags.push(inputTag.value)
//     const timeoutTag = inputTag.value
    
//     // Анимация тега при создании
//     setTimeout(() => {
//         const tagBtn = document.querySelector(`.tag-${timeoutTag}`)
//         tagBtn.classList.remove('focus')
//     }, 1000);

// }
const handleTag = () => {
  const trimmed = inputTag.value.trim().toLowerCase()
  if(trimmed === '') {
        errors.value.tags = true
        setTimeout(() => {
            errors.value.tags = false
        }, 1000);
        return
  }
  
  // Проверка, есть ли уже такой тег
  if (!tStore.isTagsExist(trimmed)) {
    const colors = [
    'red', 'green', 'blue', 'indigo', 'yellow', 'purple', 'pink', 'rose', 'orange', 'amber',
    'lime', 'teal', 'cyan', 'sky', 'emerald', 'fuchsia', 'violet', 'slate', 'neutral',
    'zinc', 'stone', 'gray'
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    tStore.createTag({ name: trimmed, color: randomColor })
  }

  // Если тег уже в списке добавленных
  if (inputsData.value.tags.some(t => t.name === trimmed)) {
    const tagBtn = document.querySelector(`.tag-${tStore.tags.find(t => t.name === trimmed)?.id}`)

    tagBtn?.classList.remove('focus')

    console.log('Такой тег уже есть');
    setTimeout(() => {
      tagBtn?.classList.add('focus')
    }, 100);
    setTimeout(() => tagBtn?.classList.remove('focus'), 1000)
    inputTag.value = ''
    return
  }

  // Найти тег из общего списка и добавить его в выбранные
  const tag = tStore.tags.find(t => t.name === trimmed)
  if (tag) {
    inputsData.value.tags.push(tag)
    const timeoutTag = tag.name
    setTimeout(() => {
      const tagBtn = document.querySelector(`.tag-${timeoutTag}`)
      tagBtn?.classList.remove('focus')
    }, 1000)
  }

  inputTag.value = ''
}


// Удаление тега из списка тегов транзакции
const removeTag = (id) => {
  const tagBtn = document.querySelector(`.tag-${id}`)
  tagBtn?.classList.add('remove')
  setTimeout(() => {
    inputsData.value.tags = inputsData.value.tags.filter(t => t.id !== id)
  }, 500)
}

const turnOffPanel = (afterClose?: () => void) => {
  const tagPanel = document.querySelector('.tagPanel')
  tagPanel?.classList.add('fade')
  
  setTimeout(() => {
    afterClose?.()
  }, 350);
  setTimeout(() => {
    tagsPanelOn.value = false
  }, 400)
}
const turnOnPanel = () => {
    tagsPanelOn.value = true
    setTimeout(() => {
        const tagPanel = document.querySelector('.tagPanel')
        tagPanel.classList.add('fade-in')
    }, 100);
}


const handleNewTag = (name: string) => {
  const trimmed = name.trim().toLowerCase()
  if (!trimmed) return

  if (!tStore.isTagsExist(trimmed)) {
    const color = getRandomColor()
    tStore.createTag({ name: trimmed, color })
  }

  const tag = tStore.tags.find(t => t.name === trimmed)
  if (tag) addTag(tag)
}

const addTag = (tag: { id: number; name: string }) => {
  if (inputsData.value.tags.some(t => t.id === tag.id)) {
    // Анимация, если уже добавлен
    const el = document.querySelector(`.tag-${tag.id}`)
    el?.classList.remove('focus')
    setTimeout(() => el?.classList.add('focus'), 100)
    setTimeout(() => el?.classList.remove('focus'), 1000)
    return
  }
  inputsData.value.tags.push(tag)
}
</script>

<template>
    <div class="slide-in-right text-center max-w-md rounded-lg p-4 bg-gray-900/50">
        <p class="mb-4  text-2xl opacity-80 text-white">Добавить транзакцию</p>
        <Myinput name="Сумма транзакции" type="date" :value="inputsData.date" @change="inputsData.date = $event.target.value"/>
        <Myinput :class="errors.amount ? '!bg-red-100 show-error' : ''" name="Сумма транзакции" type="number" :value="inputsData.amount" @input="inputsData.amount = parseInt($event.target.value)"/>
        <div class="relative">
            <Myinput name="Теги"  :class="errors.tags ? '!bg-red-100 show-error' : ''" :value="inputTag" @input="inputTag = $event.target.value" @keyup.enter="(e)=>{turnOffPanel(()=>{inputTag = ''}); e.target.blur(); handleTag()}"
             @focus="turnOnPanel" @blur="turnOffPanel"/>
            <div
                v-if="tagsPanelOn"
                style="top: 35px;"
                class="absolute mt-1 z-20 w-full rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto tagPanel"
            >
                <div
                    v-if="  inputTag.trim() !== '' && !filteredTags.some(t => t.name.toLowerCase() === inputTag.trim().toLowerCase())"
                    class="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    @click="()=>{turnOffPanel(()=>{inputTag = ''});handleTag()}"
                >
                    Добавить тег «{{ inputTag.trim() }}»
                </div>
                <div
                    v-for="tag in filteredTags"
                    :key="tag.id"
                    class="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    @click="() => {
                        const selected = tStore.tags.find(t => t.name === tag.name)
                        if (selected) {
                            inputTag = selected.name
                            turnOffPanel(() => {
                            handleTag()
                            })
                        }
                        }"
                >
                    {{ tag.name }}
                </div>
                
            </div>
        </div>
        <!-- <TagInput
          name="Теги"
          :tags="tStore.tags"
          :selected-tags="inputsData.tags"
          :error="errors.tags"
          @add-tag="handleNewTag"
          @select-tag="addTag"
        /> -->
        <div class="flex justify-start gap-3 w-full flex-wrap mb-5">
            <TagBtn v-for="tag in inputsData.tags" :key="tag.id" :name="tag.name" :color="tag.color" :class="'tag-'+tag.id" @click="removeTag(tag.id)"/> 
        </div>
        <div class="flex justify-center gap-1 mt-3">
            <Mybtn name="+ Добавить" class="w-50" @click="makeOperation(true)"/>
            <Mybtn name="- Убавить" class="w-50 !bg-rose-500 hover:bg-rose-600 hover:shadow-rose-500/30" @click="makeOperation(false)" />
        </div>
    </div>
</template>

<style>

.slide-in-right {
    animation: slideInRight 0.8s ease-out 0.2s both;
}

@keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}

.show-error{
    animation: scaleOnce 1s ease-out;
}
@keyframes scaleOnce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}


.tagPanel{
    opacity: 0;
    transform: scale(0.9);
}
.tagPanel.fade-in{
    opacity: 1;
    transform: scale(1);
}
.tagPanel.fade{
    opacity: 0;
    transform: scale(0.9);
}
</style>