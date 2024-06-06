<template>
  <div class="find-results">
    <span>Searching results</span>

    <template v-if="props.items.length > 0">
      <div v-for="(item, index) in props.items" :key="index" class="item">
        <div>Email: {{ item.email }}</div>
        <div>Number: {{ item.number }}</div>
      </div>
    </template>

    <span class="no-results" v-else-if="!loading">No matches</span>

    <div v-if="loading" class="loader">Loading...</div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.find-results {
  position: relative;
  width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > span {
    display: block;
    font-size: 16px;
    color: var(--color-primary);
  }

  & .item {
    border: 1px solid var(--color-border);
    padding: 10px;
    border-radius: 6px;
  }

  & .no-results {
    color: var(--color-text);
  }

  & .loader {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
