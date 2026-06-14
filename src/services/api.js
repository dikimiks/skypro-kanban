const API_URL = 'https://wedev-api.sky.pro/api'

const fetchWithRetry = async (url, options, retries = 3) => {
  console.log('=== fetchWithRetry ===')
  console.log('URL:', url)
  console.log('Options:', { ...options, body: options.body ? '...(скрыто)' : undefined })
  
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
      
      const response = await fetch(url, { ...options, signal: controller.signal })
      clearTimeout(timeoutId)
      
      console.log('Статус ответа:', response.status)
      
      const data = await response.json()
      console.log('Данные ответа:', data)
      
      if (response.ok) {
        return { success: true, data }
      }
      
      return { success: false, error: data.error || 'Ошибка запроса', status: response.status }
      
    } catch (error) {
      console.log(`Попытка ${i + 1} не удалась:`, error.message)
      if (i === retries - 1) {
        return { success: false, error: 'Сервер не отвечает' }
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

export const login = async (login, password) => {
  const result = await fetchWithRetry(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {},
    body: JSON.stringify({ login, password })
  })
  
  if (!result.success) throw new Error(result.error)
  return result.data
}

export const register = async (login, name, password) => {
  const result = await fetchWithRetry(`${API_URL}/user`, {
    method: 'POST',
    headers: {},
    body: JSON.stringify({ login, name, password })
  })
  
  if (!result.success) throw new Error(result.error)
  return result.data
}

export const getTasks = async () => {
  const token = localStorage.getItem('token')
  console.log('getTasks - токен:', token)
  
  const result = await fetchWithRetry(`${API_URL}/kanban`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  
  if (!result.success) throw new Error(result.error)
  return result.data
}

export const createTask = async (taskData) => {
  const token = localStorage.getItem('token')
  console.log('=== createTask ===')
  console.log('Токен:', token)
  console.log('Данные задачи:', taskData)
  
  const result = await fetchWithRetry(`${API_URL}/kanban`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  })
  
  console.log('Результат createTask:', result)
  
  if (!result.success) {
    console.error('Ошибка createTask:', result.error)
    throw new Error(result.error)
  }
  return result.data
}