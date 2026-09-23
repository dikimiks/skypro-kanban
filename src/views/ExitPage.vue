<template>
  <div class="exit-page">
    <div class="exit-container">
      <h2>Выйти из аккаунта?</h2>
      <div class="exit-buttons">
        <button class="exit-yes" @click="handleExit">Да, выйти</button>
        <button class="exit-no" @click="handleCancel">Нет, остаться</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleExit = () => {
  localStorage.removeItem('isAuth')
  localStorage.removeItem('userEmail')
  router.push('/login')
}

const handleCancel = () => {
  router.push('/')
}
</script>

<style scoped>
.exit-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: rgba(0,0,0,0.4);
}

.exit-container {
  background: var(--color-white);
  padding: 50px 60px;
  border-radius: 10px;
  text-align: center;
}

.exit-container h2 {
  margin-bottom: 20px;
}

.exit-buttons {
  display: flex;
  gap: 10px;
}

.exit-yes {
  padding: 8px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.exit-no {
  padding: 8px 20px;
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: 4px;
  cursor: pointer;
}
</style>