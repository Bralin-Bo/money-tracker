<template>
    <!-- Main Container -->
    <div class="max-w-7xl mx-auto p-6 bg-gray-800 rounded-lg" >
      <p class="text-3xl font-bold text-gray-800 dark:text-gray-100 ">История</p>
      <!-- <p>{{ sortedTransactions }}</p> -->

      <div class="flex items-start justify-center pt-5 ">
        <div class="w-full flex items-start justify-between">
          <table class="w-full border-separate border-spacing-y-2">
            <thead class="text-left">
              <tr class="bg-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <th class="px-4 py-3 rounded-l-lg">Сумма</th>
                <th class="px-4 py-3 w-[55%]">Теги</th>
                <th class="px-4 py-3">Дата</th>
                <th class="px-4 py-3 text-center rounded-r-lg">Действия</th>
              </tr>
            </thead>

            <tbody
                @click="(e)=>{handleTrnClick(e)}"
            >
               <tr
                v-if="sortedTransactions.length === 0"
                class="bg-white dark:bg-slate-900"
              >
                <td
                  colspan="4"
                  class="px-6 py-12 text-center text-slate-500 dark:text-slate-400 text-lg font-medium"
                >
                  <div class="flex flex-col items-center justify-center gap-3">
                    <!-- Иконка -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 1.343-3 3v1H7a1 1 0 00-1 1v6h12v-6a1 1 0 00-1-1h-2v-1c0-1.657-1.343-3-3-3z" />
                    </svg>
                    <!-- Текст -->
                    <span>Транзакций пока нет</span>
                    <span class="text-sm text-slate-400 dark:text-slate-500">Добавьте первую, чтобы начать отслеживать финансы</span>
                  </div>
                </td>
              </tr>
              <tr
                v-for="trn in sortedTransactions"
                :key="trn.id"
                class="rounded-lg bg-white shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out hover:shadow-md dark:bg-slate-900 dark:ring-white/10 dark:hover:bg-slate-700/50"
              >
                <td class="rounded-l-lg px-4 py-3 font-semibold">
                  <span :class="trn.positive ? 'text-emerald-500' : 'text-red-500'">
                    {{ trn.positive ? '+' : '-' }}{{ trn.amount }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <div class="flex flex-wrap gap-1.5">
                    <TagText v-for="tag in trn.tags" :key="tag.id" :name="tag.name" :color="tag.color" />
                  </div>
                </td>

                <td class="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                  {{ new Date(trn.date).toLocaleDateString('ru-RU') }}
                </td>

                <td class="rounded-r-lg px-4 py-3">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      class="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                      :data-trn-id="trn.id"
                      aria-label="Редактировать"
                    >
                    <div class="imgbox" style="width: 18px; height: 18px;">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fbbf24" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" /></svg>
                    </div>
                      </button>
                    <button
                      class="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-red-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/20 dark:hover:text-red-400"
                      :data-trn-id="trn.id"
                      aria-label="Удалить"
                    >
                    <div class="imgbox" style="width: 18px; height: 18px;">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef4444" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                    </div>  
                    </button>
                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
      <Toast ref="toast" :message="toastMessage" />
      <Modal ref="modal" :onClose="updateTransaction">
        <p class="mb-4  text-2xl opacity-80 text-white">Редактировать транзакцию</p>
        <Myinput name="Сумма транзакции" type="date" :value="inputsData.date" @change="inputsData.date = $event.target.value"/>
        <Myinput :class="errors.amount ? '!bg-red-100 show-error' : ''" name="Сумма транзакции" type="number" :value="inputsData.amount" @input="inputsData.amount = parseInt($event.target.value)"/>
        <TagInput name="Теги"
          :tags="tStore.tags"
          :selected-tags="inputsData.tags"
          :error="errors.tags"
          @add-tag="handleNewTag"
          @select-tag="addTag" />
          <div class="flex justify-start gap-3 w-full flex-wrap mb-5">
            <TagBtn v-for="tag in inputsData.tags" :key="tag.id" :name="tag.name" :color="tag.color" :class="'tag-'+tag.id" @click="removeTag(tag.id)"/> 
        </div>
        <div class="flex justify-center mt-3 mb-5 h-12">
          <div class="shadow-none w-full h-full rounded-bl-lg rounded-tl-lg flex justify-center items-center cursor-pointer"
              :class="!inputsData.positive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-500 hover:bg-gray-600'"
              @click="inputsData.positive = !inputsData.positive">
            -
          </div>
          <div class="shadow-none w-full h-full rounded-br-lg rounded-tr-lg flex justify-center items-center cursor-pointer"
              :class="inputsData.positive ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-500 hover:bg-gray-600'"
              @click="inputsData.positive = !inputsData.positive">
            +
          </div>
        </div>
        <Mybtn name="Сохранить" class="w-full" @click="handleSaveTrnClick"/>
      </Modal>
      <Modal ref="deleteModal">
        <p class="mb-4  text-2xl opacity-80 text-white">Вы уверены что хотите удалить транзакцию?</p>
        <div class="flex justify-center mt-3 h-12 gap-3">
          <Mybtn name="Отмена" class="w-full !bg-yellow-500 hover:bg-yellow-600 hover:shadow-yellow-500/30" @click="closeDeleteModal"/>
          <Mybtn name="Удалить" class="w-full !bg-rose-500 hover:bg-rose-600 hover:shadow-rose-500/30" @click="removeTransaction"/>
        </div>
      </Modal>
    </div>
</template>
<script setup>
import { computed, ref, watch } from "vue"
import { useTransactionStore } from "../../stores/transactions"
import TagText from "../Atoms/TagText.vue"
import Toast from "../Atoms/Toast.vue"
import { useBankStore } from "../../stores/bank"
import Modal from "../Atoms/Modal.vue"
import TagInput from "../Molecules/TagInput.vue"
import TagBtn from "../Atoms/TagBtn.vue"
import Myinput from "../Atoms/myinput.vue"
import Mybtn from "../Atoms/Mybtn.vue"
import { getRandomColor } from "../../utils/randomColor"

const tStore = useTransactionStore()
const bankStore = useBankStore()

const today = new Date().toISOString().split('T')[0]
const inputsData = ref({amount:null, date: today, tags: [], positive: true})
const errors = ref({amount: false, tags: false})
const modal = ref(null);
const deleteModal = ref(null);
const deleteId = ref(null)

const openModal = () => modal.value.open();
const closeModal = () => modal.value.close();

const openDeleteModal = () => deleteModal.value.open();
const closeDeleteModal = () => deleteModal.value.close();

const toastMessage = ref("Это уведомление!");
const toast = ref(null);

// сортируем по дате (сначала новые)
const sortedTransactions = computed(() =>
  [...tStore.transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
)

const handleNewTag = (name) => {
  const trimmed = name.trim().toLowerCase()
  if (!trimmed) return

  if (!tStore.isTagsExist(trimmed)) {
    const color = getRandomColor()
    tStore.createTag({ name: trimmed, color })
  }

  const tag = tStore.tags.find(t => t.name === trimmed)
  if (tag) addTag(tag)
}

const addTag = (tag) => {
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
// Удаление тега из списка тегов транзакции
const removeTag = (id) => {
  const tagBtn = document.querySelector(`.tag-${id}`)
  tagBtn?.classList.add('remove')
  setTimeout(() => {
    inputsData.value.tags = inputsData.value.tags.filter(t => t.id !== id)
  }, 500)
}

const handleTrnClick = (e) => {
  const button = e.target.closest("button");
  
  if (!button) return; 
  
  const id = button.dataset.trnId; // читаем data-trn-id
  const action = button.getAttribute("aria-label"); // например "Редактировать" или "Удалить"

  const trn = tStore.transactions.find(t => t.id === id)
  
  if (action === "Редактировать") {
    inputsData.value = { ...trn }
    openModal()
  } else if (action === "Удалить") {
    deleteId.value = id
    openDeleteModal()
  }
};
const handleSaveTrnClick = () => {
  closeModal()
}

const updateTransaction = () => {
  const oldTrn = tStore.transactions.find(t => t.id === inputsData.value.id)
  if (!oldTrn) return

  bankStore.amount -= oldTrn.amount * (oldTrn.positive ? 1 : -1)

  bankStore.amount += inputsData.value.amount * (inputsData.value.positive ? 1 : -1)

  tStore.updateTransaction(inputsData.value.id, { ...inputsData.value })
  bankStore.saveToLocalStorage()
  toastMessage.value = "Транзакция обновлена"
  showToast()
}
const removeTransaction = () => {
    const trn = tStore.transactions.find(t => t.id === deleteId.value)
    bankStore.amount += trn.amount * (trn.positive ? -1 : 1)
    bankStore.saveToLocalStorage()
    tStore.deleteTransaction(deleteId.value)
    toastMessage.value = "Транзакция удалена"
    showToast()
    closeDeleteModal()
}
const showToast = () => {
  toast.value.show();
};
</script>
