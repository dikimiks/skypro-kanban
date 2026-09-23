<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <div :class="['card__theme', `card__theme--${theme}`]">
          <p>{{ themeText }}</p>
        </div>
        
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
              <path d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" stroke="var(--color-text-secondary)" stroke-width="0.8" stroke-linejoin="round"/>
              <path d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z" stroke="var(--color-text-secondary)" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_1_415">
                <rect width="13" height="13" fill="var(--color-white)"/>
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
    description: props.description,
    date: props.date
  })
}
</script>

<style scoped>
.cards__item {
  padding: 5px;
  animation: card-animation 0.5s linear;
}

@keyframes card-animation {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: auto;
    opacity: 1;
  }
}

.cards__card {
  width: 220px;
  height: 130px;
  background-color: var(--color-white);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
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
  cursor: pointer;
}

.card__btn div {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-text-secondary);
}

.card__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--color-text);
  margin-bottom: 10px;
  cursor: pointer;
}

.card__content {
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.card__date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card__date svg {
  width: 13px;
}

.card__date p {
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: var(--color-text-secondary);
  letter-spacing: 0.2px;
}

@media screen and (max-width: 1200px) {
  .cards__card {
    width: 220px;
  }
}
</style>