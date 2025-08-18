<script setup>
import Navbar from './components/Molecules/Navbar.vue';

import { useBankStore } from './stores/bank'
import { useTransactionStore } from './stores/transactions'

const bankStore = useBankStore()
const transactionsStore = useTransactionStore()

bankStore.loadFromLocalStorage()
transactionsStore.loadTagsFromLocalStorage()
transactionsStore.loadFromLocalStorage()
</script>

<template>
  <Navbar />
  <div class="md:pt-20 px-4 sm:px-6 lg:px-8 md:pb-20 pb-30 pt-5" >
    <RouterView />
  </div>
  
  <!-- <Test /> -->
</template>

<style scoped>
</style>
