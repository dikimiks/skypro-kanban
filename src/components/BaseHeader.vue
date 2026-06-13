<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo">
          <router-link to="/">
            <img src="/images/logo.png" alt="logo" />
          </router-link>
        </div>
        
        <nav class="header__nav">
          <button class="header__btn-main-new" @click="openNewCardModal">
            Создать новую задачу
          </button>
          
          <button class="header__user" @click="toggleUserPopup">
            {{ userName }}
          </button>
          
          <div class="user-popup" v-if="isUserPopupVisible">
            <p class="user-name">{{ userName }}</p>
            <p class="user-email">{{ userEmail }}</p>
            <div class="user-theme">
              <span>Темная тема</span>
              <input type="checkbox" />
            </div>
            <button class="user-logout" @click="logout">Выйти</button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isUserPopupVisible = ref(false)

const userName = computed(() => localStorage.getItem('userName') || 'Ivan Ivanov')
const userEmail = computed(() => localStorage.getItem('userEmail') || 'ivan.ivanov@gmail.com')

const toggleUserPopup = () => {
  isUserPopupVisible.value = !isUserPopupVisible.value
}

const openNewCardModal = () => {
  const modal = document.getElementById('popNewCard')
  if (modal) {
    modal.style.display = 'block'
  }
}

const logout = () => {
  localStorage.removeItem('isAuth')
  localStorage.removeItem('userName')
  localStorage.removeItem('userEmail')
  router.push('/login')
}
</script>

<style scoped>
.header {
  width: 100%;
  background: white;
  border-bottom: 1px solid #eaeef6;
}

.container {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 30px;
}

.header__block {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo img {
  width: 85px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.header__btn-main-new {
  padding: 8px 20px;
  background: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.header__user {
  background: none;
  border: none;
  color: #565eef;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.header__user::after {
  content: "▼";
  font-size: 10px;
}

.user-popup {
  position: absolute;
  top: 50px;
  right: 0;
  width: 220px;
  background: white;
  border-radius: 10px;
  border: 1px solid #d4dbe5;
  box-shadow: 0px 10px 39px rgba(0,0,0,0.1);
  padding: 20px;
  z-index: 100;
}

.user-name {
  font-weight: 600;
  margin-bottom: 5px;
  text-align: center;
}

.user-email {
  color: #94a6be;
  font-size: 12px;
  margin-bottom: 15px;
  text-align: center;
}

.user-theme {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.user-logout {
  width: 100%;
  padding: 8px;
  background: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-logout:hover {
  background: #33399b;
}

@media (max-width: 495px) {
  .header__btn-main-new {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    z-index: 100;
  }
}
</style>