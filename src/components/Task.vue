<template>
  <div class="cards__item">
    <article
      class="cards__card card"
      draggable="true"
      @click="$emit('open-task', task)"
      @dragstart="$emit('drag-task', task)"
      @dragend="$emit('drag-end')"
    >
      <div class="card__group">
        <div :class="['card__theme', `card__theme--${theme}`]">
          <p>{{ task.topic || 'Без категории' }}</p>
        </div>

        <button
          class="card__btn"
          type="button"
          :aria-label="`Открыть задачу: ${task.title}`"
          @click.stop="$emit('open-task', task)"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="card__content">
        <h3 class="card__title">{{ task.title }}</h3>

        <div class="card__date">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" stroke="var(--color-text-secondary)" stroke-width="0.8" stroke-linejoin="round"/>
            <path d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125M9.75 1.21875V2.03125" stroke="var(--color-text-secondary)" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>{{ formattedDate }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['open-task', 'drag-task', 'drag-end'])

const theme = computed(() => {
  const themes = {
    'Web Design': 'orange',
    Research: 'green',
    Copywriting: 'purple'
  }
  return themes[props.task.topic] || 'orange'
})

const formattedDate = computed(() => {
  if (!props.task.date) return 'Дата не указана'

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})/.exec(props.task.date)
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(props.task.date)

  if (Number.isNaN(date.getTime())) return 'Дата не указана'

  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`
})
</script>

<style scoped>
.cards__item {
  padding: 5px;
  animation: card-animation 0.5s linear;
}

.cards__card {
  width: 220px;
  height: 130px;
  background-color: var(--color-white);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 13px 19px;
  cursor: grab;
}

.cards__card:active {
  cursor: grabbing;
}

.card__group {
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__theme {
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
}

.card__theme p {
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
}

.card__theme--orange {
  background-color: var(--color-orange-bg);
  color: var(--color-orange-text);
}

.card__theme--green {
  background-color: var(--color-green-bg);
  color: var(--color-green-text);
}

.card__theme--purple {
  background-color: var(--color-purple-bg);
  color: var(--color-purple-text);
}

.card__btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.card__btn span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-text-secondary);
}

.card__content {
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
}

.card__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--color-text);
  margin-bottom: 10px;
}

.card__date {
  display: flex;
  align-items: center;
}

.card__date p {
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: var(--color-text-secondary);
  letter-spacing: 0.2px;
}
</style>
