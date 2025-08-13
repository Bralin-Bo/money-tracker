<script setup lang="ts">
import { useTransactionStore } from '../../stores/transactions';
import AddTransaction from '../Molecules/AddTransaction.vue';
import BankAmount from '../Molecules/BankAmount.vue';

const tStore = useTransactionStore()
</script>

<template>
    <div class="flex justify-center items-center h-screen gap-20">
        <div class="pr-30">
            <BankAmount />
        </div>
        <div>
            <AddTransaction />
        </div>
    </div>
    <div class="">
        <div class="">
            <!-- <div v-for="trn in tStore.transactions" :key="trn.id">
                <p><span>{{ trn.positive ? '+' : '-' }}</span>{{ trn.amount }} - {{ trn.tags }} - {{ trn.date }}</p>
            </div> -->
            <table class="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                    <tr class="text-left text-gray-700 dark:text-gray-200">
                    <th>Сумма</th>
                    <th>Теги</th>
                    <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="trn in tStore.transactions"
                    :key="trn.id"
                    class="bg-[rgba(102,126,234,0.8)] dark:bg-[rgba(60,60,90,0.8)] border border-[rgba(255,255,255,0.7)] dark:border-gray-600 rounded-md text-white dark:text-gray-100"
                    >
                    <td class="px-4 py-2 font-semibold">
                        <span :class="trn.positive ? 'text-green-300' : 'text-red-400'">
                        {{ trn.positive ? '+' : '-' }}{{ trn.amount }}
                        </span>
                    </td>
                    <td class="px-4 py-2">{{ trn.tags }}</td>
                    <td class="px-4 py-2 text-xs text-gray-200">
                        {{ new Date(trn.date).toLocaleDateString('ru-RU') }}
                    </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>