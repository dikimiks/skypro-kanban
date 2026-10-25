<template>
  <div class="app-layout" :class="{ 'theme-dark': isDark }">
    <router-view />
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTasks, createTask, updateTask, deleteTask, login, register } from '../services/api.js'

const router = useRouter()
const token = ref(localStorage.getItem('token') || '')
const user = ref({
  login: localStorage.getItem('userLogin') || '',
  name: localStorage.getItem('userName') || '',
  token: token.value
})
const isAuth = computed(() => Boolean(token.value))
const isDark = ref(localStorage.getItem('theme') === 'dark')

const saveSession = (account) => {
  if (!account?.token || !account?.login || !account?.name) {
    throw new Error('Сервер вернул неполные данные пользователя')
  }

  token.value = account.token
  user.value = {
    login: account.login,
    name: account.name,
    token: account.token
  }
  localStorage.setItem('token', account.token)
  localStorage.setItem('userName', account.name)
  localStorage.setItem('userLogin', account.login)
}

const handleLogin = async (loginValue, passwordValue) => {
  try {
    const response = await login(loginValue, passwordValue)
    saveSession(response.user)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message || 'Ошибка входа' }
  }
}

const handleRegister = async (loginValue, nameValue, passwordValue) => {
  try {
    await register(loginValue, nameValue, passwordValue)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message || 'Ошибка регистрации' }
  }
}

const logout = () => {
  token.value = ''
  user.value = { login: '', name: '', token: '' }
  tasks.value = []
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('userLogin')
  localStorage.removeItem('isAuth')
  router.push('/login')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const tasks = ref([])
const isLoading = ref(false)
const error = ref('')

const loadTasks = async () => {
  if (!isAuth.value) return { success: false, error: 'Не авторизован' }

  isLoading.value = true
  error.value = ''

  try {
    const response = await getTasks()
    if (!Array.isArray(response.tasks)) {
      throw new Error('Сервер вернул некорректный список задач')
    }
    tasks.value = response.tasks
    return { success: true }
  } catch (err) {
    error.value = err.message || 'Ошибка загрузки задач'
    return { success: false, error: error.value }
  } finally {
    isLoading.value = false
  }
}

const runTaskAction = async (action) => {
  if (!isAuth.value) return { success: false, error: 'Не авторизован' }

  try {
    await action()
    return await loadTasks()
  } catch (err) {
    return { success: false, error: err.message || 'Не удалось выполнить действие' }
  }
}

const addTask = (taskData) => runTaskAction(() => createTask(taskData))
const updateTaskById = (id, taskData) =>
  runTaskAction(() => updateTask(id, taskData))
const deleteTaskById = (id) => runTaskAction(() => deleteTask(id))

provide('auth', {
  isAuth,
  user,
  login: handleLogin,
  register: handleRegister,
  logout
})

provide('tasks', {
  tasks,
  isLoading,
  error,
  loadTasks,
  addTask,
  updateTask: updateTaskById,
  deleteTask: deleteTaskById
})

provide('theme', { isDark, toggleTheme })
</script>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100vh;
}
</style>
