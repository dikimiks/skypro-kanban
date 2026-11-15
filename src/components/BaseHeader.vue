<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <router-link to="/">
            <img src="/assets/logo.png" alt="Skypro" />
          </router-link>
        </div>
        <div class="header__logo _dark">
          <router-link to="/">
            <img src="/assets/logo_dark.png" alt="Skypro" />
          </router-link>
        </div>

        <nav class="header__nav">
          <button class="header__btn-main-new _hover01" type="button" @click="$emit('create-task')">
            Создать новую задачу
          </button>

          <button class="header__user _hover02" type="button" @click="toggleUserPopup">
            {{ displayName }}
          </button>

          <div
            class="header__pop-user-set pop-user-set"
            :class="{ 'pop-user-set--open': isUserPopupVisible }"
          >
            <p class="pop-user-set__name">{{ displayName }}</p>
            <p class="pop-user-set__mail">{{ displayLogin }}</p>
            <label class="pop-user-set__theme">
              <span>Темная тема</span>
              <input v-model="isDarkModel" type="checkbox" class="checkbox" name="theme" />
            </label>
            <button type="button" class="_hover03" @click="requestLogout">
              Выйти
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

defineEmits(['create-task'])

const router = useRouter()
const { user } = inject('auth')
const { isDark, toggleTheme } = inject('theme')
const isUserPopupVisible = ref(false)

const displayName = computed(() => user.value?.name || 'Пользователь')
const displayLogin = computed(() => user.value?.login || '')

const toggleUserPopup = () => {
  isUserPopupVisible.value = !isUserPopupVisible.value
}

const requestLogout = () => {
  isUserPopupVisible.value = false
  router.push('/exit')
}

const isDarkModel = computed({
  get: () => isDark.value,
  set: toggleTheme
})
</script>

<style scoped>
.header__pop-user-set {
  display: none;
}

.header__pop-user-set.pop-user-set--open {
  display: block;
}

.header__user {
  border: 0;
  background: transparent;
  font: inherit;
  padding: 0;
}
</style>
