<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <router-link to="/">
            <img src="/images/logo.png" alt="logo" />
          </router-link>
        </div>
        <div class="header__logo _dark">
          <router-link to="/">
            <img src="/images/logo_dark.png" alt="logo" />
          </router-link>
        </div>
        
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01" @click="openNewCardModal">
            Создать новую задачу
          </button>
          
          <a href="#" class="header__user _hover02" @click.prevent="toggleUserPopup">
            {{ userName }}
          </a>
          
          <div class="header__pop-user-set pop-user-set" :class="{ 'pop-user-set--open': isUserPopupVisible }">
            <p class="pop-user-set__name">{{ userName }}</p>
            <p class="pop-user-set__mail">{{ userEmail }}</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox" />
            </div>
            <button type="button" class="_hover03" @click="logout">
              Выйти
            </button>
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
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('userLogin')
  localStorage.removeItem('isAuth')
  router.push('/login')
}
</script>

<style scoped>
/* Только для управления видимостью попапа */
.header__pop-user-set {
  display: none;
}

.header__pop-user-set.pop-user-set--open {
  display: block;
}

/* Остальные стили берутся из main.css */
</style>