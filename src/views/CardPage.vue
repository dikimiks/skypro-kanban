<template>
  <BoardPage :task-id="route.params.id" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import BoardPage from './BoardPage.vue'

const route = useRoute()
</script>
