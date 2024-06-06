<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Email*</label>

      <input
        v-model="formData.email"
        id="email"
        name="email"
        type="email"
        placeholder="sample@mail.com"
      />

      <span v-show="props.errors.email" class="error-message">{{ props.errors.email }}</span>
    </div>

    <div class="form-group">
      <label for="number">Number</label>

      <input-number
        v-model="formData.number"
        id="number"
        name="number"
        type="text"
        placeholder="12-34-56"
      />

      <span v-show="props.errors.number" class="error-message">{{ props.errors.number }}</span>
    </div>

    <button class="submit-btn" :class="{ disabled: !canSubmit }" type="submit">Find</button>
  </form>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import InputNumber from '@/components/InputNumber.vue'

const NUMBER_LENGTH = 6

const props = defineProps({
  errors: {
    type: Object,
    required: true
  }
})

const emits = defineEmits({
  find: (item) => item instanceof Object,
  change: null
})

const formData = reactive({
  email: '',
  number: ''
})

const canSubmit = computed(() => {
  return (
    itemForFind.value.email?.length > 0 &&
    (!itemForFind.value.number || itemForFind.value.number.length === NUMBER_LENGTH)
  )
})

const itemForFind = computed(() => {
  const item = {}
  for (const key in formData) {
    let value = formData[key]

    if (key === 'number') {
      value = formData.number.replaceAll('-', '').replaceAll('_', '')
    }

    if (value === '') continue

    item[key] = value
  }
  return item
})

watch(
  () => formData,
  () => {
    emits('change')
  },
  { deep: true }
)

async function onSubmit() {
  emits('find', itemForFind.value)
}
</script>

<style lang="scss" scoped>
.form {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background-color: var(--color-form-background);

  & input {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    width: 100%;
    font-size: 16px;

    &:focus {
      outline: 1px solid var(--color-primary);
    }
  }

  & button.submit-btn {
    margin-top: 15px;
    background-color: var(--color-primary);
    color: #ffffff;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-primary-hover);
    }

    &.disabled {
      cursor: default;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  & .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;

    & label {
      font-size: 12px;
      color: var(--color-label);
    }

    & .error-message {
      font-size: 10px;
      color: var(--color-danger);
    }
  }
}
</style>
