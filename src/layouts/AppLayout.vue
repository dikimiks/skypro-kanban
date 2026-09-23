<template>
  <div class="app-layout">
    <router-view />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTasks, createTask, updateTask, deleteTask, login, register } from '../services/api.js'

const router = useRouter()

// ========== СОСТОЯНИЕ АВТОРИЗАЦИИ ==========
const isAuth = ref(false)
const user = ref({
  login: '',
  name: '',
  token: ''
})

const checkAuth = () => {
  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')
  const userLogin = localStorage.getItem('userLogin')
  
  if (token && userName) {
    isAuth.value = true
    user.value = {
      login: userLogin || '',
      name: userName || '',
      token: token
    }
  }
}

const handleLogin = async (loginValue, passwordValue) => {
  try {
    const response = await login(loginValue, passwordValue)
    user.value = {
      login: response.user.login,
      name: response.user.name,
      token: response.user.token
    }
    isAuth.value = true
    
    localStorage.setItem('token', response.user.token)
    localStorage.setItem('userName', response.user.name)
    localStorage.setItem('userLogin', response.user.login)
    localStorage.setItem('isAuth', 'true')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const handleRegister = async (loginValue, nameValue, passwordValue) => {
  try {
    const response = await register(loginValue, nameValue, passwordValue)
    user.value = {
      login: response.user.login,
      name: response.user.name,
      token: response.user.token
    }
    isAuth.value = true
    
    localStorage.setItem('token', response.user.token)
    localStorage.setItem('userName', response.user.name)
    localStorage.setItem('userLogin', response.user.login)
    localStorage.setItem('isAuth', 'true')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const logout = () => {
  isAuth.value = false
  user.value = { login: '', name: '', token: '' }
  
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('userLogin')
  localStorage.removeItem('isAuth')
  
  router.push('/login')
}

// ========== СОСТОЯНИЕ ЗАДАЧ ==========
const tasks = ref([])
const isLoading = ref(false)
const error = ref('')

const loadTasks = async () => {
  if (!isAuth.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    const response = await getTasks()
    tasks.value = response.tasks || []
  } catch (err) {
    error.value = err.message || 'Ошибка загрузки задач'
  } finally {
    isLoading.value = false
  }
}

const addTask = async (taskData) => {
  if (!isAuth.value) {
    return { success: false, error: 'Не авторизован' }
  }
  
  try {
    await createTask(taskData)
    await loadTasks()
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const updateTaskById = async (id, taskData) => {
  if (!isAuth.value) return { success: false, error: 'Не авторизован' }
  
  try {
    await updateTask(id, taskData)
    await loadTasks()
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const deleteTaskById = async (id) => {
  if (!isAuth.value) return { success: false, error: 'Не авторизован' }
  
  try {
    await deleteTask(id)
    await loadTasks()
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

// ========== PROVIDE ==========
provide('auth', {
  isAuth,
  user,
  login: handleLogin,
  register: handleRegister,
  logout,
  checkAuth
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

// ========== ИНИЦИАЛИЗАЦИЯ ==========
onMounted(() => {
  checkAuth()
  if (isAuth.value) {
    loadTasks()
  }
})
</script>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100vh;
}
</style>