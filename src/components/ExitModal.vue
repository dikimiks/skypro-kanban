<template>
  <div
    v-if="visible"
    class="pop-exit is-open"
    role="dialog"
    aria-modal="true"
    aria-labelledby="exit-title"
    @click.self="closeModal"
  >
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2 id="exit-title">Выйти из аккаунта?</h2>
        </div>
        <div class="pop-exit__form-group">
          <button class="pop-exit__exit-yes _hover01" type="button" @click="logout">
            Да, выйти
          </button>
          <button class="pop-exit__exit-no _hover03" type="button" @click="closeModal">
            Нет, остаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const { logout } = inject('auth')

const closeModal = () => emit('close')
</script>

<style scoped>
.pop-exit.is-open {
  display: block;
}
</style>
