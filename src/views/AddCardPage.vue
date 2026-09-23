<template>
  <div class="add-card-page">
    <div class="container">
      <h2>Добавление новой задачи</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Название задачи</label>
          <input type="text" v-model="title" required />
        </div>
        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="description"></textarea>
        </div>
        <button type="submit">Создать</button>
      </form>
      <router-link to="/" class="back-link">← Назад</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const description = ref('')

const handleSubmit = () => {
  // Здесь будет логика добавления
  router.push('/')
}
</script>

<style scoped>
.add-card-page {
  padding: 40px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: var(--color-primary);
  text-decoration: none;
}
</style>