<template>
  <main class="auth-page register-page">
    <section class="auth-card register-container" aria-labelledby="register-title">
      <h2 id="register-title">Регистрация</h2>

      <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

      <form class="auth-form" @submit.prevent="handleRegister">
        <label class="visually-hidden" for="register-name">Имя</label>
        <input
          id="register-name"
          v-model.trim="nameValue"
          class="auth-input"
          type="text"
          name="name"
          placeholder="Имя"
          autocomplete="name"
          required
        />
        <label class="visually-hidden" for="register-email">Эл. почта</label>
        <input
          id="register-email"
          v-model.trim="loginValue"
          class="auth-input"
          type="email"
          name="login"
          placeholder="Эл. почта"
          autocomplete="email"
          required
        />
        <label class="visually-hidden" for="register-password">Пароль</label>
        <input
          id="register-password"
          v-model="passwordValue"
          class="auth-input"
          type="password"
          name="password"
          placeholder="Пароль"
          autocomplete="new-password"
          minlength="4"
          required
        />
        <button class="auth-submit _hover01" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
        <div class="auth-links">
          <p>Уже есть аккаунт? <router-link to="/login">Войдите здесь</router-link></p>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register } = inject('auth')
const loginValue = ref('')
const nameValue = ref('')
const passwordValue = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await register(loginValue.value, nameValue.value, passwordValue.value)
    if (!result.success) {
      errorMessage.value = result.error || 'Ошибка регистрации'
      return
    }
    await router.push('/login')
  } catch (error) {
    errorMessage.value = error.message || 'Ошибка регистрации'
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

.register-page {
  background: #eaeef6;
  color: #000;
}

.auth-card {
  width: 100%;
  max-width: 368px;
  padding: 50px 60px;
  border-radius: 10px;
  text-align: center;
}

.register-container {
  background: #fff;
  box-shadow: 0 4px 67px -12px rgba(0, 0, 0, 0.13);
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
  color: rgba(148, 166, 190, 0.6);
  font-size: 14px;
  line-height: 21px;
}

.auth-links a {
  color: #94a6be;
  text-decoration: underline;
}

.error-message {
  margin-bottom: 12px;
  color: #e74c3c;
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
