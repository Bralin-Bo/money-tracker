<script setup lang="ts">
import { useTransactionStore } from '../../stores/transactions';
import AddTransaction from '../Molecules/AddTransaction.vue';
import BankAmount from '../Molecules/BankAmount.vue';

const tStore = useTransactionStore()
</script>

<template>
    <div class="max-w-7xl mx-auto p-6 bg-gray-800 rounded-lg pb-20">
        <p class="text-3xl font-bold text-gray-800 dark:text-gray-100 ">Главная</p>

        <div class="flex gap-10 mt-10 flex-col md:flex-row">
            <div>
                <AddTransaction />
            </div>
            <div class="w-full md:mt-0 mt-20">
                <BankAmount />
            </div>
        </div>
    </div>
    <div class="">
        <div class="">
        </div>
    </div>
</template>