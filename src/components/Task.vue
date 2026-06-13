<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <div :class="['card__theme', `_${theme}`]">
          <p :class="`_${theme}`">{{ themeText }}</p>
        </div>
        
        <!-- Кнопка с тремя точками - открывает модалку -->
        <div class="card__btn" onclick="document.getElementById('popBrowse').style.display='block'">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
      <div class="card__content">
        <h3 class="card__title" @click="openTask">{{ taskTitle }}</h3>
        
        <div class="card__date">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <g clip-path="url(#clip0_1_415)">
              <path d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" stroke="#94A6BE" stroke-width="0.8" stroke-linejoin="round"/>
              <path d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z" stroke="#94A6BE" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_1_415">
                <rect width="13" height="13" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <p>{{ date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  taskId: {
    type: [Number, String],
    required: true
  },
  theme: {
    type: String,
    default: 'orange'
  },
  themeText: {
    type: String,
    default: 'Web Design'
  },
  taskTitle: {
    type: String,
    default: 'Название задачи'
  },
  date: {
    type: String,
    default: '30.10.23'
  },
  description: {
    type: String,
    default: 'Описание задачи'
  }
})

const emit = defineEmits(['open-task'])

const openTask = () => {
  emit('open-task', {
    id: props.taskId,
    title: props.taskTitle,
    theme: props.theme,
    themeText: props.themeText,
    description: props.description
  })
}
</script>

<style scoped>
.card__btn {
  cursor: pointer;
}
.card__title {
  cursor: pointer;
}
</style>