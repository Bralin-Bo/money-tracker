import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
    tags: [],
    tagIdCounter: 0
  }),
  actions: {
    createTransaction({ date = new Date().toISOString(), tags, amount, positive }) {
      this.transactions.push({
        id: crypto.randomUUID(),
        date,
        tags,
        amount,
        positive, // true - в плюс, false - в минус
      })
      this.saveToLocalStorage()
    },

    updateTransaction(id, updatedData) {
      const index = this.transactions.findIndex(t => t.id === id)
      if (index !== -1) {
        this.transactions[index] = {
          ...this.transactions[index],
          ...updatedData,
        }
      }
      this.saveToLocalStorage()
    },

    deleteTransaction(id) {
      this.transactions = this.transactions.filter(t => t.id !== id)
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('transactions', JSON.stringify(this.transactions))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('transactions')
      if (saved) {
        this.transactions = JSON.parse(saved)
      }
    },

    // Tags
    createTag({ name, color }) {
      const trimmedName = name.trim().toLowerCase()
      const exists = this.tags.some(t => t.name === trimmedName)
      if (exists) return

      this.tags.push({
        id: ++this.tagIdCounter,
        name: trimmedName,
        color
      })
      this.saveTagsToLocalStorage()
    },

    updateTag(id, newName, newColor) {
      const tag = this.tags.find(t => t.id === id)
      if (tag) {
        tag.name = newName
        tag.color = newColor
      }
      this.saveTagsToLocalStorage()
    },

    deleteTag(id) {
      this.tags = this.tags.filter(t => t.id !== id)
      this.saveTagsToLocalStorage()
    },


    clearAll() {
      this.transactions = [],
      this.tags = [],
      this.tagIdCounter = 0
      this.saveToLocalStorage()
      this.saveTagsToLocalStorage()
    },
    saveTagsToLocalStorage() {
      localStorage.setItem('tags', JSON.stringify({
        tags: this.tags,
        tagIdCounter: this.tagIdCounter
      }))
    },
    loadTagsFromLocalStorage() {
      const saved = localStorage.getItem('tags')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.tags = parsed.tags || []
        this.tagIdCounter = parsed.tagIdCounter || 0
      }
    }
  },
  getters: {
    isTagExist(name) {
      return this.tags.some(t => t.name.toLowerCase() === name.trim().toLowerCase())
    },

    findTagByName(name) {
      return this.tags.find(t => t.name.toLowerCase() === name.trim().toLowerCase())
    },
    isTagsExist: (state) => (name) => {
      return state.tags.some(t => t == name)
    },
  }
})