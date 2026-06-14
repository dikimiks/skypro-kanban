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
import { ref } from 'vue'
import BaseHeader from '../components/BaseHeader.vue'
import TaskDesk from '../components/TaskDesk.vue'
import TaskModal from '../components/TaskModal.vue'
import NewCardModal from '../components/NewCardModal.vue'

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

const onTaskCreated = () => {
  if (taskDeskRef.value) {
    taskDeskRef.value.refreshTasks()
  }
}
</script>