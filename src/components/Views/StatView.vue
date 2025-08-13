<template>
    <!-- <div class="pt-30">
        <h1>Статистика</h1>
        <div>
            <p>Дата статистики - </p>
            <input v-model="fromDate" type="date">
            <input v-model="toDate" type="date">
        </div>
        <p>Общее количество дохода: {{ totalIncome }}тг</p>
        <p>Общее количество расхода: {{ totalExpense }}тг</p>
        <p v-if="totalSaved >= 0">Вы сохранили денег: {{ totalSaved }}тг {{ totalSavedPercent }}%></p>
        <p v-else>Вы ушли в долг на: {{ totalSaved }}тг {{ totalSavedPercent }}%</p>

        <p>Доходы по тегам</p>
        <div v-for="tag in tagStatsIncome" :key="tag.id">
            <p>{{ tag.name }} — {{ tag.amount }}₸ ({{ tag.percent }}%)</p>
        </div>
        <p>Расходы по тегам</p>
        <div v-for="tag in tagStatsExpense" :key="tag.id">
            <p>{{ tag.name }} — {{ tag.amount }}₸ ({{ tag.percent }}%)</p>
        </div>
    </div> -->
  <div class="pt-30 px-4 max-w-3xl mx-auto text-gray-800 dark:text-gray-100 space-y-6">
    <h1 class="text-2xl font-semibold">Статистика</h1>

    <div class="space-y-2">
      <p class="text-sm text-gray-600 dark:text-gray-400">Дата статистики:</p>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          v-model="fromDate"
          type="date"
          class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
        />
        <input
          v-model="toDate"
          type="date"
          class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="space-y-1">
      <p class="text-base">💰 <span class="font-medium">Доход:</span> {{ totalIncome }} ₸</p>
      <p class="text-base">💸 <span class="font-medium">Расход:</span> {{ totalExpense }} ₸</p>
      <p
        class="text-base"
        :class="totalSaved >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'"
      >
        {{ totalSaved >= 0
          ? `Вы сохранили денег: ${totalSaved} ₸ (${totalSavedPercent}%)`
          : `Вы ушли в долг на: ${totalSaved} ₸ (${totalSavedPercent}%)` }}
      </p>
    </div>

    <div class="space-y-2">
      <h2 class="text-lg font-medium">📈 Доходы по тегам</h2>
      <div
        v-for="tag in tagStatsIncome"
        :key="tag.id"
        class="text-sm text-gray-700 dark:text-gray-300"
      >
        <p>{{ tag.name }} — {{ tag.amount }} ₸ ({{ tag.percent }}%)</p>
      </div>
    </div>

    <div class="space-y-2">
      <h2 class="text-lg font-medium">📉 Расходы по тегам</h2>
      <div
        v-for="tag in tagStatsExpense"
        :key="tag.id"
        class="text-sm text-gray-700 dark:text-gray-300"
      >
        <p>{{ tag.name }} — {{ tag.amount }} ₸ ({{ tag.percent }}%)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTransactionStore } from '../../stores/transactions';
const fromDate = ref('2025-08-01')
const toDate = ref('2025-08-31')
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

const tStore = useTransactionStore()
const filteredIncome = computed(() => {
  return tStore.transactions.filter(tx => {
    return tx.positive &&
      tx.date >= fromDate.value &&
      tx.date <= toDate.value
  })
})
const totalIncome = computed(() => {
  return filteredIncome.value.reduce((sum, tx) => sum + tx.amount, 0)
})

const filteredExpense = computed(() => {
  return tStore.transactions.filter(tx => {
    return !tx.positive &&
      tx.date >= fromDate.value &&
      tx.date <= toDate.value
  })
})
const totalExpense = computed(() => {
  return filteredExpense.value.reduce((sum, tx) => sum + tx.amount, 0)
})

const totalSaved = computed(() => {
  return totalIncome.value - totalExpense.value
})
const totalSavedPercent = computed(() => {
  return  Math.round((totalSaved.value/totalIncome.value) *100)
})

const filteredTransactions = computed(() => {
  return tStore.transactions.filter(tx => {
    return tx.date >= fromDate.value && tx.date <= toDate.value
  })
})
const tagStatsIncome = computed(() => {
  const tagAmountMap = new Map()
  let totalAmount = 0

  filteredTransactions.value.forEach(tx => {
    if (!tx.positive) return // Только доходы

    const amountPerTag = tx.amount / tx.tags.length

    tx.tags.forEach(tag => {
      const id = tag.id
      tagAmountMap.set(id, (tagAmountMap.get(id) || 0) + amountPerTag)
      totalAmount += amountPerTag
    })
  })

  return tStore.tags.map(tag => {
    const amount = tagAmountMap.get(tag.id) || 0
    const percent = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0

    return {
      ...tag,
      amount,
      percent
    }
  }).filter(tag => tag.amount > 0)
})

const tagStatsExpense = computed(() => {
  const tagAmountMap = new Map()
  let totalAmount = 0

  filteredTransactions.value.forEach(tx => {
    if (tx.positive) return // Только расходы

    const amountPerTag = tx.amount / tx.tags.length

    tx.tags.forEach(tag => {
      const id = tag.id
      tagAmountMap.set(id, (tagAmountMap.get(id) || 0) + amountPerTag)
      totalAmount += amountPerTag
    })
  })

  return tStore.tags.map(tag => {
    const amount = tagAmountMap.get(tag.id) || 0
    const percent = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0

    return {
      ...tag,
      amount,
      percent
    }
  }).filter(tag => tag.amount > 0)
})
</script>