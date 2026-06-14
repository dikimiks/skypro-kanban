<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Регистрация</h2>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Логин</label>
          <input type="text" v-model="loginValue" required />
        </div>
        <div class="form-group">
          <label>Имя</label>
          <input type="text" v-model="nameValue" required />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="passwordValue" required />
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>
      <p class="login-link">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register } = inject('auth')  // ← Получаем функцию регистрации из provide

const loginValue = ref('')
const nameValue = ref('')
const passwordValue = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  if (!loginValue.value || !nameValue.value || !passwordValue.value) {
    errorMessage.value = 'Заполните все поля'
    return
  }

  if (passwordValue.value.length < 4) {
    errorMessage.value = 'Пароль должен быть не менее 4 символов'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // ← Используем inject вместо прямого вызова API
  const result = await register(loginValue.value, nameValue.value, passwordValue.value)

  if (result.success) {
    successMessage.value = 'Регистрация успешна! Перенаправление...'
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } else {
    errorMessage.value = result.error || 'Ошибка регистрации. Возможно, логин уже занят.'
  }

  isLoading.value = false
}
</script>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-bg-light);
}

.register-container {
  background: var(--color-white);
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: var(--color-primary-hover);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  background: #fee;
  color: #e74c3c;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}
</style>