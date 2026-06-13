<template>
  <div class="wrapper">
    <BaseHeader />
    <TaskDesk @open-task="openTaskModal" />
    
    <!-- Модалка просмотра задачи -->
    <TaskModal 
      v-if="isTaskModalVisible"
      :task-title="selectedTask.title"
      :theme="selectedTask.theme"
      :theme-text="selectedTask.themeText"
      :description="selectedTask.description"
      @close="closeTaskModal"
    />
    
    <!-- Остальные модалки -->
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

// Состояние модалки задачи
const isTaskModalVisible = ref(false)
const selectedTask = ref({
  title: '',
  theme: 'orange',
  themeText: '',
  description: ''
})

// Функция открытия модалки
const openTaskModal = (task) => {
  selectedTask.value = task
  isTaskModalVisible.value = true
}

// Функция закрытия модалки
const closeTaskModal = () => {
  isTaskModalVisible.value = false
}
</script>