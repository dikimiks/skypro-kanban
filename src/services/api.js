const API_URL = 'https://wedev-api.sky.pro/api'

export const login = async (login, password) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    body: JSON.stringify({ login, password })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

export const register = async (login, name, password) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    body: JSON.stringify({ login, name, password })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

export const getTasks = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/kanban`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

export const createTask = async (taskData) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/kanban`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(taskData)
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

export const updateTask = async (id, taskData) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/kanban/${id}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(taskData)
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

export const deleteTask = async (id) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/kanban/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}