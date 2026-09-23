<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Страница не найдена</h2>
    <router-link to="/" class="home-link">Вернуться на главную</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-bg);
}

.not-found h1 {
  font-size: 120px;
  margin: 0;
  color: var(--color-primary);
}

.not-found h2 {
  margin: 20px 0;
  color: var(--color-text-secondary);
}

.home-link {
  padding: 10px 20px;
  background: var(--color-primary);
  color: var(--color-white);
  text-decoration: none;
  border-radius: 8px;
}
</style>