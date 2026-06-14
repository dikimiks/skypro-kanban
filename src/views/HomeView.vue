<template>
  <div class="wrapper">
    <BaseHeader />
    <TaskDesk @open-task="openTaskModal" />
    
    <TaskModal 
      :task-title="selectedTask.title"
      :theme="selectedTask.theme"
      :theme-text="selectedTask.themeText"
      :description="selectedTask.description"
    />
    
    <ExitModal />
    <NewCardModal />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseHeader from '../components/BaseHeader.vue'
import TaskDesk from '../components/TaskDesk.vue'
import TaskModal from '../components/TaskModal.vue'
import ExitModal from '../components/ExitModal.vue'
import NewCardModal from '../components/NewCardModal.vue'

const selectedTask = ref({
  title: '',
  theme: 'orange',
  themeText: '',
  description: ''
})

const openTaskModal = (task) => {
  selectedTask.value = task
}
</script>