<template>
  <div class="px-4 max-w-7xl mx-auto text-gray-800 dark:text-gray-100 space-y-6">
    <div class="space-y-6">
      <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">Статистика</p>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div class="space-y-6">
          <div>
            <label for="fromDate" class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Выберите период
            </label>
            <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <input
                id="fromDate"
                v-model="fromDate"
                type="date"
                class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span class="text-gray-400 dark:text-gray-500 hidden sm:block">—</span>
              <input
                v-model="toDate"
                type="date"
                class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <hr class="border-gray-200 dark:border-gray-700" />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div class="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg">
              <p class="text-sm text-gray-500 dark:text-gray-400 flex gap-1 items-end mb-1">
                <div class="imgbox" style="width: 18px; height: 18px;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4CAF50" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" /></svg>
                </div>
                 Прибыль
                </p>
              <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ totalIncome }} ₸</p>
            </div>
            <div 
              class="p-4 rounded-lg"
              :class="totalSaved >= 0 ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'"
            >
              <p 
                class="text-sm flex gap-1 items-end mb-1"
                :class="totalSaved >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                     
                <div class="imgbox" style="width: 18px; height: 18px;">
                  <svg v-if="totalSaved >= 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#4CAF50" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"/>
                  </svg>

                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#f87171" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"/>
                  </svg>
                </div>
                {{ totalSaved >= 0 ? 'Сохранено' : 'В минусе на'}}
              </p>
              <p 
                class="text-2xl font-semibold"
                :class="totalSaved >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'"
              >
                {{ Math.abs(totalSaved) }} ₸
                <span class="text-base font-normal">({{ totalSavedPercent }}%)</span>
              </p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg">
              <p class="text-sm text-gray-500 dark:text-gray-400 flex gap-1 items-end mb-1">
                <div class="imgbox" style="width: 18px; height: 18px;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f87171" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" /></svg>
                </div>
                Потрачено</p>
              <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ totalExpense }} ₸</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <div class="sspace-y-2 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full">
        <p class="text-xl mb-4 font-bold">Доходы по тегам</p>
        <!-- <div
          v-for="tag in tagStatsIncome"
          :key="tag.id"
          class="text-sm text-gray-700 dark:text-gray-300"
        >
          <p>{{ tag.color }} — {{ tag.amount }} ₸ ({{ tag.percent }}%)</p>
        </div> -->


        <div v-if="chartDataIncome.labels.length === 0" class="flex flex-col items-center justify-center py-10 text-slate-500 dark:text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8a3 3 0 00-3 3v1H7a1 1 0 00-1 1v6h12v-6a1 1 0 00-1-1h-2v-1a3 3 0 00-3-3z"/>
          </svg>
          <span class="font-medium">Нет данных по доходам</span>
          <span class="text-sm text-slate-400 dark:text-slate-500">Добавьте транзакции с тегами</span>
        </div>

        <div class="relative" id="chart-container">
          <div class="pie-chart" ref="pieChart"></div>
          <ul class="legend" ref="legend"></ul>
          <div ref="tooltip" class="tooltip"></div>
        </div>
      </div>
      
      <div class="sspace-y-2 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full">
        <p class="text-xl mb-4 font-bold">Расходы по тегам</p>
        <!-- <div
          v-for="tag in tagStatsExpense"
          :key="tag.id"
          class="text-sm text-gray-700 dark:text-gray-300"
        >
          <p>{{ tag.name }} — {{ tag.amount }} ₸ ({{ tag.percent }}%)</p>
        </div> -->
        <div v-if="chartDataExpense.labels.length === 0" class="flex flex-col items-center justify-center py-10 text-slate-500 dark:text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8a3 3 0 00-3 3v1H7a1 1 0 00-1 1v6h12v-6a1 1 0 00-1-1h-2v-1a3 3 0 00-3-3z"/>
          </svg>
          <span class="font-medium">Нет данных по расходам</span>
          <span class="text-sm text-slate-400 dark:text-slate-500">Добавьте транзакции с тегами</span>
        </div>

        <div class="relative" id="chart-container2">
          <div class="pie-chart" ref="pieChart2"></div>
          <ul class="legend" ref="legend2"></ul>
          <div ref="tooltip2" class="tooltip"></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useTransactionStore } from '../../stores/transactions';
import { createSimpleChart } from '../../utils/simplePie';
const fromDate = ref('2025-08-01')
const toDate = ref('2025-08-31')
const colors = {
  red:     "#f87171", // red-400
  green:   "#4ade80", // green-400
  blue:    "#60a5fa", // blue-400
  indigo:  "#818cf8", // indigo-400
  yellow:  "#facc15", // yellow-400
  purple:  "#c084fc", // purple-400
  pink:    "#f472b6", // pink-400
  rose:    "#fb7185", // rose-400
  orange:  "#fb923c", // orange-400
  amber:   "#fbbf24", // amber-400
  lime:    "#a3e635", // lime-400
  teal:    "#2dd4bf", // teal-400
  cyan:    "#22d3ee", // cyan-400
  sky:     "#38bdf8", // sky-400
  emerald: "#34d399", // emerald-400
  fuchsia: "#e879f9", // fuchsia-400
  violet:  "#a78bfa", // violet-400
  slate:   "#94a3b8", // slate-400
  neutral: "#a3a3a3", // neutral-400
  zinc:    "#a1a1aa", // zinc-400
  stone:   "#a8a29e", // stone-400
  gray:    "#9ca3af"  // gray-400
};

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


const pieChart = ref(null);
const legend = ref(null);
const tooltip = ref(null);

const pieChart2 = ref(null);
const legend2 = ref(null);
const tooltip2 = ref(null);

const chartDataIncome = computed(() => {
  const tags = tagStatsIncome.value

  return {
    labels: tags.map(tag => tag.name),
    values: tags.map(tag => tag.amount),
    colors: tags.map(tag => colors[tag.color] || '#999') // подставляем HEX из словаря
  }
})
const chartDataExpense = computed(() => {
  const tags = tagStatsExpense.value

  return {
    labels: tags.map(tag => tag.name),
    values: tags.map(tag => tag.amount),
    colors: tags.map(tag => colors[tag.color] || '#999') // подставляем HEX из словаря
  }
})
onMounted(() => {
  createSimpleChart(pieChart.value, legend.value, tooltip.value, chartDataIncome.value);
  createSimpleChart(pieChart2.value, legend2.value, tooltip2.value, chartDataExpense.value);
});

watch(chartDataIncome, (newData) => {
  createSimpleChart(pieChart.value, legend.value, tooltip.value, newData)
})
watch(chartDataExpense, (newData) => {
  createSimpleChart(pieChart2.value, legend2.value, tooltip2.value, newData)
})
</script>

<style>
    
    .tooltip {
      position: fixed;
      padding: 5px 10px;
      background: rgba(0, 0, 0, 0.75);
      color: white;
      border-radius: 5px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .tooltip.show {
      opacity: 1;
    }
    .pie-chart {
      width: 100%;
      max-width: 350px; /* ограничиваем сверху, чтобы на больших экранах не раздувалась */
      aspect-ratio: 1 / 1; /* сохраняем квадрат */
      position: relative;
      margin: 0 auto;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .pie-slice {
      position: absolute;
      width: 50%;   /* теперь половина контейнера */
      height: 50%;
      transform-origin: 100% 100%;
      transition: all 0.3s ease;
      cursor: pointer;
      overflow: hidden;
    }

    .pie-slice::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: 0 100% 0 0;
      transform-origin: 0 100%;
    }

    .pie-slice:hover {
        z-index: 10;
        transform: scale(1.1);
        filter: brightness(1.15) saturate(1.2);
    }

    .legend {
        margin-top: 25px;
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column;
    }

    .legend li {
        display: flex;
        align-items: center;
        margin: 0 15px 10px 15px;
        font-size: 14px;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .legend li:hover {
        transform: translateY(-2px);
    }

    .legend-color {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-radius: 5px;
    }

    .slice-tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 1000;
        transform: translate(-50%, -120%);
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .slice-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border: 5px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.9);
    }

    .slice-tooltip.show {
        opacity: 1;
    }

    .highlighted {
        transform: scale(1.05);
        filter: brightness(1.1);
        z-index: 5;
    }
</style>