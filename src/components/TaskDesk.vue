<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div v-if="isLoading" class="loading-container" role="status">
          <div class="loading-spinner"></div>
          <p class="loading-text">Данные загружаются...</p>
        </div>

        <div v-else-if="error" class="error-container" role="alert">
          <p class="error-text">{{ error }}</p>
          <button class="retry-btn" type="button" @click="loadTasks">Повторить</button>
        </div>

        <div v-else-if="!hasTasks" class="empty-container">
          <p class="empty-text">Задач нет</p>
        </div>

        <div v-else class="main__content">
          <p v-if="actionError" class="task-action-error" role="alert">{{ actionError }}</p>
          <TaskColumn
            v-for="column in columns"
            :key="column.status"
            :column-title="column.title"
            :column-status="column.status"
            @drop-task="moveTask"
          >
            <Task
              v-for="task in column.tasks"
              :key="task._id || task.id"
              :task="task"
              @open-task="$emit('open-task', $event)"
              @drag-task="draggedTask = $event"
              @drag-end="draggedTask = null"
            />
          </TaskColumn>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'
import { columnStatuses } from '../data/statuses.js'

defineEmits(['open-task'])

const { tasks, isLoading, error, loadTasks, updateTask } = inject('tasks')
const columns = computed(() =>
  columnStatuses.map((column) => ({
    ...column,
    tasks: tasks.value.filter((task) => task.status === column.status)
  }))
)
const hasTasks = computed(() => tasks.value.length > 0)
const draggedTask = ref(null)
const actionError = ref('')

const moveTask = async (status) => {
  const task = draggedTask.value
  draggedTask.value = null

  if (!task || task.status === status) return

  const id = task._id ?? task.id
  if (id === undefined || id === null) {
    actionError.value = 'Не удалось определить задачу'
    return
  }

  const result = await updateTask(id, {
    title: task.title,
    description: task.description || '',
    topic: task.topic,
    status,
    date: task.date
  })

  if (!result.success) actionError.value = result.error
}

onMounted(() => {
  if (!tasks.value.length) loadTasks()
})
</script>

<style scoped>
.loading-container,
.empty-container,
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.loading-container,
.error-container {
  flex-direction: column;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #eaeef6;
  border-top-color: #565eef;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: #94a6be;
  font-family: 'Roboto', sans-serif;
}

.empty-text {
  font-size: 18px;
  color: #94a6be;
  text-align: center;
}

.error-text,
.task-action-error {
  color: #e74c3c;
}

.error-text {
  font-size: 16px;
  margin-bottom: 20px;
}

.retry-btn {
  padding: 10px 20px;
  background: #565eef;
  color: white;
  border: 0;
  border-radius: 8px;
}

.task-action-error {
  margin: 0 10px 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
