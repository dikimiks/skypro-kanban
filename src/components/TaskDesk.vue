<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Данные загружаются...</p>
          </div>

          <div v-else-if="error" class="error-container">
            <p class="error-text">{{ error }}</p>
            <button class="retry-btn" @click="loadTasks">Повторить</button>
          </div>

          <div v-else-if="!hasTasks" class="empty-container">
            <p class="empty-text">Задач нет</p>
          </div>

          <template v-else>
            <TaskColumn 
              v-for="column in columns" 
              :key="column.status"
              :column-title="column.title"
            >
              <Task 
                v-for="task in column.tasks"
                :key="task._id"
                :task-id="task._id"
                :theme="getThemeClass(task.topic)"
                :theme-text="task.topic"
                :task-title="task.title"
                :date="formatDate(task.date)"
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
import { ref, computed, onMounted, inject, watch } from 'vue'
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'

const emit = defineEmits(['open-task'])

// Получаем данные и функции из provide
const { tasks, isLoading, error, loadTasks } = inject('tasks')

const columns = ref([])

const columnStatuses = [
  { status: "Без статуса", title: "Без статуса" },
  { status: "Нужно сделать", title: "Нужно сделать" },
  { status: "В работе", title: "В работе" },
  { status: "Тестирование", title: "Тестирование" },
  { status: "Готово", title: "Готово" }
]

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

const formatDate = (dateString) => {
  if (!dateString) return 'Дата не указана'
  const date = new Date(dateString)
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

const updateColumns = () => {
  columns.value = columnStatuses.map(column => ({
    ...column,
    tasks: tasks.value.filter(task => task.status === column.status)
  }))
}

const handleOpenTask = (task) => {
  emit('open-task', task)
}

// Обновить задачи (для родительского компонента)
const refreshTasks = () => {
  loadTasks()
}

// Следим за изменением задач
watch(tasks, () => {
  updateColumns()
}, { deep: true, immediate: true })

onMounted(() => {
  loadTasks()
})

defineExpose({
  refreshTasks,
  loadTasks
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

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #eaeef6;
  border-top: 4px solid #565eef;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: #94a6be;
}

.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.empty-text {
  font-size: 18px;
  color: #94a6be;
  text-align: center;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.error-text {
  font-size: 16px;
  color: #e74c3c;
  margin-bottom: 20px;
}

.retry-btn {
  padding: 10px 20px;
  background: #565eef;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>