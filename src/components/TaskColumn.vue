<template>
  <div
    class="main__column"
    @dragover.prevent
    @drop.prevent="$emit('drop-task', columnStatus)"
  >
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
    required: true,
    default: 'Без названия'
  },
  columnStatus: {
    type: String,
    required: true
  }
})

defineEmits(['drop-task'])
</script>

<style scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}

.column__title {
  padding: 0 10px;
  margin: 15px 0;
}

.column__title p {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.cards {
  width: 100%;
  display: block;
  position: relative;
}

@media screen and (max-width: 1200px) {
  .main__column {
    width: 100%;
  }
  .cards {
    display: flex;
    gap: 0;
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>