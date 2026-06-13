<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Вход в аккаунт</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="login-btn">Войти</button>
      </form>
      <p class="register-link">
        Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Простая проверка (можно усложнить)
  if (email.value && password.value) {
    localStorage.setItem('isAuth', 'true')
    localStorage.setItem('userEmail', email.value)
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-bg);
}

.login-container {
  background: var(--color-white);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: var(--color-text);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.login-btn:hover {
  background: var(--color-primary-hover);
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: var(--color-primary);
  text-decoration: none;
}
</style>