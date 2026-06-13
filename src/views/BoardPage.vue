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
import { tasksData } from '../data/tasks.js'  // 👈 ДОБАВИТЬ ЭТУ СТРОКУ

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
  document.getElementById('popBrowse').style.display = 'block'
}

const onTaskCreated = (newTask) => {  // 👈 ДОБАВИТЬ newTask
  console.log('Task created, reloading...', newTask)
  
  //  ДОБАВИТЬ ЗАДАЧУ В МАССИВ
  tasksData.push(newTask)
  
  if (taskDeskRef.value && taskDeskRef.value.loadTasks) {
    taskDeskRef.value.loadTasks()
  } else {
    console.log('taskDeskRef not ready yet')
  }
}
</script>