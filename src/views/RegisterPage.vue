<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Регистрация</h2>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Логин</label>
          <input type="text" v-model="login" required />
        </div>
        <div class="form-group">
          <label>Имя</label>
          <input type="text" v-model="name" required />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="password" required />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const login = ref('')
const name = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  if (!login.value || !name.value || !password.value) {
    errorMessage.value = 'Заполните все поля'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await fetch('https://wedev-api.sky.pro/api/user', {
      method: 'POST',
      // Не добавляем заголовок Content-Type
      body: JSON.stringify({
        login: login.value,
        name: name.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Если статус 400, скорее всего пользователь уже существует
      throw new Error(data.error || 'Ошибка регистрации. Возможно, логин уже занят.')
    }

    if (data.user?.token) {
      // Успешная регистрация: сохраняем токен и данные пользователя
      localStorage.setItem('token', data.user.token)
      localStorage.setItem('userName', data.user.name)
      localStorage.setItem('userLogin', data.user.login)
      localStorage.setItem('isAuth', 'true')

      successMessage.value = 'Регистрация успешна! Перенаправление...'
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      throw new Error('Некорректный ответ сервера')
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #eaeef6;
}
.register-container {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
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
  padding: 10px;
  border: 1px solid #d4dbe5;
  border-radius: 8px;
  font-size: 14px;
}
button {
  width: 100%;
  padding: 12px;
  background: #565eef;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
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
.login-link {
  text-align: center;
  margin-top: 20px;
}
.login-link a {
  color: #565eef;
  text-decoration: none;
}
</style>