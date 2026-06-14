<template>
  <div class="pop-exit" id="popExit" style="display: none;">
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>
        <div class="pop-exit__form-group">
          <button class="pop-exit__exit-yes _hover01" @click="handleExit">
            Да, выйти
          </button>
          <button class="pop-exit__exit-no _hover03" @click="closeModal">
            Нет, остаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const closeModal = () => {
  const modal = document.getElementById('popExit')
  if (modal) {
    modal.style.display = 'none'
  }
}

const handleExit = () => {
  // Очищаем localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('userLogin')
  localStorage.removeItem('isAuth')
  
  // Закрываем модалку
  closeModal()
  
  // Перенаправляем на страницу входа
  router.push('/login')
}
</script>