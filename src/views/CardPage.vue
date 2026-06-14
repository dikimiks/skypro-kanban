<template>
  <div class="card-page">
    <div class="container">
      <h2>Карточка задачи #{{ id }}</h2>
      <p>Здесь будет просмотр задачи с ID: {{ id }}</p>
      <router-link to="/" class="back-link">← Назад к доске</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<style scoped>
.card-page {
  padding: 40px 0;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: var(--color-primary);
  text-decoration: none;
}
</style>