<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <!-- Состояние загрузки -->
          <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Данные загружаются...</p>
          </div>

          <!-- Когда загрузка прошла, но задач нет -->
          <div v-else-if="!hasTasks" class="empty-container">
            <p class="empty-text">Задач нет</p>
          </div>

          <!-- Колонки с задачами -->
          <template v-else>
            <TaskColumn 
              v-for="column in columns" 
              :key="column.status"
              :column-title="column.title"
            >
              <Task 
                v-for="task in column.tasks"
                :key="task.id"
                :task-id="task.id"
                :theme="getThemeClass(task.topic)"
                :theme-text="task.topic"
                :task-title="task.title"
                :date="task.date"
                :description="task.description"
                @open-task="handleOpenTask"
              />
            </TaskColumn>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'
// Временно для проверки
// import { tasksData } from '../data/tasks.js'  // закомментировать
const tasksData = []  // добавить эту строку

const emit = defineEmits(['open-task'])

const isLoading = ref(true)
const columns = ref([])

const columnStatuses = [
  { status: "Без статуса", title: "Без статуса" },
  { status: "Нужно сделать", title: "Нужно сделать" },
  { status: "В работе", title: "В работе" },
  { status: "Тестирование", title: "Тестирование" },
  { status: "Готово", title: "Готово" }
]

// Проверяем, есть ли задачи
const hasTasks = computed(() => {
  return columns.value.some(column => column.tasks.length > 0)
})

const getThemeClass = (topic) => {
  const themes = {
    "Web Design": "orange",
    "Research": "green",
    "Copywriting": "purple"
  }
  return themes[topic] || "orange"
}

const loadTasks = () => {
  isLoading.value = true
  setTimeout(() => {
    columns.value = columnStatuses.map(column => ({
      ...column,
      tasks: tasksData.filter(task => task.status === column.status)
    }))
    isLoading.value = false
  }, 500)
}

const handleOpenTask = (task) => {
  emit('open-task', task)
}

onMounted(() => {
  loadTasks()
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

/* Анимация спиннера */
.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--color-bg-light);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: var(--color-text-secondary);
  font-family: 'Roboto', sans-serif;
}

/* Стили для пустого состояния */
.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.empty-text {
  font-size: 18px;
  color: var(--color-text-secondary);
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

/* Анимация вращения */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>