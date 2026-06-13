<template>
  <div class="pop-browse" id="popBrowse" v-if="visible">
    <div class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
            <h3 class="pop-browse__ttl">{{ taskTitle }}</h3>
            <div :class="['categories__theme theme-top', `_${theme}`]">
              <p :class="`_${theme}`">{{ themeText }}</p>
            </div>
          </div>

          <div class="pop-browse__wrap">
            <div class="form-browse__block">
              <label class="subttl">Описание задачи</label>
              <textarea 
                class="form-browse__area" 
                :value="description"
                readonly
              ></textarea>
            </div>
          </div>

          <div class="pop-browse__btn-browse">
            <div class="btn-group">
              <button class="btn-browse__edit _btn-bor _hover03">
                Редактировать задачу
              </button>
              <button class="btn-browse__delete _btn-bor _hover03">
                Удалить задачу
              </button>
            </div>
            <button class="btn-browse__close _btn-bg _hover01" @click="closeModal">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  taskTitle: {
    type: String,
    default: 'Название задачи'
  },
  theme: {
    type: String,
    default: 'orange'
  },
  themeText: {
    type: String,
    default: 'Web Design'
  },
  description: {
    type: String,
    default: 'Описание задачи'
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

// Блокировка скролла при открытой модалке
watch(() => props.visible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>