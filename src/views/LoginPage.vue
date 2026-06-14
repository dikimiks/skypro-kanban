<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Вход в аккаунт</h2>
      
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Логин</label>
          <input type="text" v-model="loginValue" placeholder="Логин" />
        </div>
        
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="passwordValue" placeholder="Пароль" />
        </div>
        
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
      
      <p>Тестовые данные: admin / admin</p>
      <p><router-link to="/register">Зарегистрироваться</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginValue = ref('admin')
const passwordValue = ref('admin')
const isLoading = ref(false)
const errorMessage = ref('')

const loginWithRetry = async (login, password, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 секунд таймаут
      
      const response = await fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({ login, password }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      const data = await response.json()
      
      if (response.ok) {
        return { success: true, data }
      } else {
        return { success: false, error: data.error || 'Ошибка авторизации' }
      }
      
    } catch (error) {
      console.log(`Попытка ${i + 1} не удалась:`, error.message)
      if (i === retries - 1) {
        return { success: false, error: 'Сервер не отвечает. Попробуйте позже.' }
      }
      // Ждём 1 секунду перед следующей попыткой
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  const result = await loginWithRetry(loginValue.value, passwordValue.value)
  
  if (result.success) {
    const data = result.data
    localStorage.setItem('token', data.user.token)
    localStorage.setItem('userName', data.user.name)
    localStorage.setItem('userLogin', data.user.login)
    localStorage.setItem('isAuth', 'true')
    
    router.push('/')
  } else {
    errorMessage.value = result.error
  }
  
  isLoading.value = false
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-bg-light);
}

.login-container {
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
</style>