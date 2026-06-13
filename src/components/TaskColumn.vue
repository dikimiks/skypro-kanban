<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ columnTitle }}</p>
    </div>
    <div class="cards">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columnTitle: {
    type: String,
    default: 'Без названия'
  }
})
</script>