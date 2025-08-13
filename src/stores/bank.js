import { defineStore } from 'pinia'

export const useBankStore = defineStore('counter', {
  state: () => ({
    amount: 0,
  }),
  actions: {
    add(value) {
      this.amount += value
      this.saveToLocalStorage()
    },
    subtract(value) {
      this.amount -= value
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('bank', JSON.stringify(this.amount))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('bank')
      if (saved !== null) {
        this.amount = JSON.parse(saved)
      }
    }
  },
})