<template>
  <main>
    <TheForm @find="handleFind" :errors="errorsData" class="mb-20" @change="handleChangeForm" />
    <FindResults :items="findResultsItems" :loading="loading" />
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import TheForm from '../components/FindForm.vue'
import FindResults from '../components/FindResults.vue'

import useFind from '@/composables/useFind.js'

const { find, errors, loading } = useFind()

const findResultsItems = ref([])

const errorsData = reactive({})
clearErrorMessages()

function clearErrorMessages() {
  errorsData.email = null
  errorsData.number = null
}

function setErrorMessages(errors) {
  for (const err of errors) {
    errorsData[err.context.label] = err.message
  }
}

async function handleFind(item) {
  findResultsItems.value = []

  try {
    findResultsItems.value = await find(item)
  } catch (err) {
    setErrorMessages(errors.value)
  }
}

function handleChangeForm() {
  clearErrorMessages()
}
</script>

<style lang="scss" scoped>
main {
  padding: 20px;
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
