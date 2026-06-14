<template>
  <div class="wrapper">
    <BaseHeader />
    <TaskDesk ref="taskDeskRef" @open-task="openTaskModal" />
    
    <TaskModal 
      :task-title="selectedTask.title"
      :theme="selectedTask.theme"
      :theme-text="selectedTask.themeText"
      :description="selectedTask.description"
      :date="selectedTask.date"
    />
    
    <NewCardModal @task-created="onTaskCreated" />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import BaseHeader from '../components/BaseHeader.vue'
import TaskDesk from '../components/TaskDesk.vue'
import TaskModal from '../components/TaskModal.vue'
import NewCardModal from '../components/NewCardModal.vue'

// Получаем функции из provide
const { addTask } = inject('tasks')

const taskDeskRef = ref(null)
const selectedTask = ref({
  title: '',
  theme: 'orange',
  themeText: '',
  description: '',
  date: ''
})

const openTaskModal = (task) => {
  selectedTask.value = task
  const modal = document.getElementById('popBrowse')
  if (modal) modal.style.display = 'block'
}

const onTaskCreated = async (newTask) => {
  // Используем inject вместо прямого вызова API
  const result = await addTask(newTask)
  
  if (result.success && taskDeskRef.value) {
    taskDeskRef.value.refreshTasks()
  }
}
</script>