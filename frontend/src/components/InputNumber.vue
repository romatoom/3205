<template>
  <input
    ref="maskedInput"
    :value="modelValue"
    id="number"
    name="number"
    type="text"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMask } from '@/utils/number-mask.js'

const maskedInput = ref()
let mask

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits({
  'update:modelValue': (value) => typeof value === 'string'
})

onMounted(() => {
  mask = getMask(maskedInput.value)
  mask.on('accept', () => {
    emits('update:modelValue', mask.value)
  })
})
</script>

<style></style>
