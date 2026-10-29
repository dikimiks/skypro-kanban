<template>
  <main class="auth-page login-page">
    <section class="auth-card login-container" aria-labelledby="login-title">
      <h2 id="login-title">Вход</h2>

      <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <label class="visually-hidden" for="login-email">Эл. почта</label>
        <input
          id="login-email"
          v-model.trim="loginValue"
          class="auth-input"
          type="email"
          name="login"
          placeholder="Эл. почта"
          autocomplete="username"
          required
        />
        <label class="visually-hidden" for="login-password">Пароль</label>
        <input
          id="login-password"
          v-model="passwordValue"
          class="auth-input"
          type="password"
          name="password"
          placeholder="Пароль"
          autocomplete="current-password"
          required
        />
        <button class="auth-submit _hover01" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
        <div class="auth-links">
          <p>Нужно зарегистрироваться?</p>
          <router-link to="/register">Регистрируйтесь здесь</router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = inject('auth')
const loginValue = ref('')
const passwordValue = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!loginValue.value.trim() || !passwordValue.value.trim()) {
    errorMessage.value = 'Заполните все поля'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await login(loginValue.value, passwordValue.value)
    if (!result.success) {
      errorMessage.value = result.error || 'Ошибка входа'
      return
    }
    await router.push('/')
  } catch (error) {
    errorMessage.value = error.message || 'Ошибка входа'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.login-page {
  background: #151419;
  color: #fff;
}

.auth-card {
  width: 100%;
  max-width: 368px;
  padding: 50px 60px;
  border-radius: 10px;
  text-align: center;
}

.login-container {
  background: #20202c;
  border: 1px solid #414454;
}

.auth-card h2 {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.auth-input {
  width: 100%;
  min-width: 0;
  margin-bottom: 7px;
  padding: 7px 9px;
  border: 1px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  outline: none;
  background: transparent;
  color: inherit;
  font: 14px/21px Roboto, Arial, sans-serif;
}

.auth-input::placeholder {
  color: #94a6be;
}

.auth-submit {
  width: 100%;
  min-height: 30px;
  margin: 13px 0 20px;
  border: 0;
  border-radius: 4px;
  background: #565eef;
  color: #fff;
  font: 500 14px/21px Roboto, Arial, sans-serif;
}

.auth-submit:disabled {
  cursor: wait;
  opacity: 0.7;
}

.auth-links {
  font-size: 14px;
  line-height: 21px;
}

.auth-links p {
  color: rgba(148, 166, 190, 0.55);
}

.auth-links a {
  color: rgba(148, 166, 190, 0.75);
  text-decoration: underline;
}

.error-message {
  margin-bottom: 12px;
  color: #ff8b8b;
  font-size: 13px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 375px) {
  .auth-card {
    padding: 40px 24px;
  }
}
</style>
