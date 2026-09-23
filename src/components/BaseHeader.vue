<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <!-- Логотипы -->
        <div class="header__logo _show _light">
          <a href="" target="_self">
            <img src="/images/logo.png" alt="logo" />
          </a>
        </div>
        <div class="header__logo _dark">
          <a href="" target="_self">
            <img src="/images/logo_dark.png" alt="logo" />
          </a>
        </div>
        
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>
          
          <!-- Кнопка пользователя -->
          <button 
            class="header__user _hover02" 
            @click="toggleUserPopup"
          >
            Ivan Ivanov
          </button>
          
          <!-- Модалка пользователя -->
          <div 
            class="header__pop-user-set pop-user-set" 
            :style="{ display: isUserPopupVisible ? 'block' : 'none' }"
          >
            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox" />
            </div>
            <button type="button" class="_hover03">
              <a href="#popExit">Выйти</a>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isUserPopupVisible = ref(false)

const toggleUserPopup = () => {
  isUserPopupVisible.value = !isUserPopupVisible.value
}

// Закрыть попап при клике вне его (опционально)
const closeUserPopup = () => {
  isUserPopupVisible.value = false
}
</script>

<style scoped>
.header__user {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
}
</style>