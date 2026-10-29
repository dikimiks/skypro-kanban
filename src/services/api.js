const API_URL = 'https://wedev-api.sky.pro/api'

const fetchApi = async (...args) => {
  try {
    return await fetch(...args)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Сервер недоступен. Проверьте подключение и повторите попытку.')
    }
    throw error
  }
}

const readResponse = async (response) => {
  const text = await response.text()
  if (!text) return {}

  try {
    const data = JSON.parse(text)
    if (!data || typeof data !== 'object') {
      throw new Error('invalid response data')
    }
    return data
  } catch {
    throw new Error('Сервер вернул некорректный ответ')
  }
}

export const login = async (login, password) => {
  const response = await fetchApi(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password })
  })
  const data = await readResponse(response)
  if (!response.ok) throw new Error(data.error || `Ошибка входа (${response.status})`)
  return data
}

export const register = async (login, name, password) => {
  const response = await fetchApi(`${API_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, name, password })
  })
  const data = await readResponse(response)
  if (!response.ok) throw new Error(data.error || `Ошибка регистрации (${response.status})`)
  return data
}

export const getTasks = async () => {
  const token = localStorage.getItem('token')
  const response = await fetchApi(`${API_URL}/kanban`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await readResponse(response)
  if (!response.ok) throw new Error(data.error || `Не удалось загрузить задачи (${response.status})`)
  return data
}

export const createTask = async (taskData) => {
  const token = localStorage.getItem('token')
  const response = await fetchApi(`${API_URL}/kanban`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  const data = await readResponse(response)
  if (!response.ok) throw new Error(data.error || `Не удалось создать задачу (${response.status})`)
  return data
}

export const updateTask = async (id, taskData) => {
  const token = localStorage.getItem('token')
  const response = await fetchApi(`${API_URL}/kanban/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  const data = await readResponse(response)
  if (!response.ok) throw new Error(data.error || `Не удалось обновить задачу (${response.status})`)
  return data
}

export const deleteTask = async (id) => {
  const token = localStorage.getItem('token')
  const response = await fetchApi(`${API_URL}/kanban/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await readResponse(response)
  if (!response.ok) throw new Error(data.error || `Не удалось удалить задачу (${response.status})`)
  return data
}