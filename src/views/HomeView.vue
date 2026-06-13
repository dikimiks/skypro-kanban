<template>
  <div class="wrapper">
    <BaseHeader />
    <TaskDesk />
    
    <!-- Попапы (по ТЗ) -->
    <ExitModal />
    <NewCardModal />
    <TaskModal />
  </div>
</template>

<script setup>
import BaseHeader from '../components/BaseHeader.vue'
import TaskDesk from '../components/TaskDesk.vue'
import ExitModal from '../components/ExitModal.vue'
import NewCardModal from '../components/NewCardModal.vue'
import TaskModal from '../components/TaskModal.vue'
</script>
