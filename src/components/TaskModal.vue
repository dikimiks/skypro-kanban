<template>
  <div
    v-if="visible && task"
    class="pop-browse is-open"
    role="dialog"
    aria-modal="true"
    aria-labelledby="task-modal-title"
    @click.self="closeModal"
  >
    <div class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
            <h3 id="task-modal-title" class="pop-browse__ttl">{{ task.title }}</h3>
            <div :class="['categories__theme theme-top _active-category', `_${categoryTheme}`]">
              <p :class="`_${categoryTheme}`">{{ task.topic || 'Без категории' }}</p>
            </div>
          </div>

          <div class="pop-browse__status status">
            <p class="status__p subttl">Статус</p>
            <div class="status__themes">
              <template v-if="isEditing">
                <button
                  v-for="item in columnStatuses"
                  :key="item.status"
                  type="button"
                  class="status__theme"
                  :class="{ 'status__theme--selected': draftStatus === item.status }"
                  @click="draftStatus = item.status"
                >
                  <p>{{ item.title }}</p>
                </button>
              </template>
              <div v-else class="status__theme status__theme--selected">
                <p>{{ task.status || 'Без статуса' }}</p>
              </div>
            </div>
          </div>

          <div class="pop-browse__wrap">
            <div class="pop-browse__form form-browse">
              <div class="form-browse__block">
                <label for="task-description" class="subttl">Описание задачи</label>
                <textarea
                  id="task-description"
                  v-model="draftDescription"
                  class="form-browse__area"
                  :readonly="!isEditing"
                ></textarea>
              </div>
            </div>

            <div class="pop-new-card__calendar calendar">
              <p class="calendar__ttl subttl">Даты</p>
              <div class="calendar__block">
                <template v-if="isEditing || draftDate">
                  <div class="calendar__nav">
                    <div class="calendar__month">{{ currentMonth }}</div>
                    <div v-if="isEditing" class="nav__actions">
                      <div class="nav__action" @click="prevMonth">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                          <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"/>
                        </svg>
                      </div>
                      <div class="nav__action" @click="nextMonth">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                          <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="calendar__content">
                    <div class="calendar__days-names">
                      <div class="calendar__day-name">пн</div>
                      <div class="calendar__day-name">вт</div>
                      <div class="calendar__day-name">ср</div>
                      <div class="calendar__day-name">чт</div>
                      <div class="calendar__day-name">пт</div>
                      <div class="calendar__day-name -weekend-">сб</div>
                      <div class="calendar__day-name -weekend-">вс</div>
                    </div>
                    <div class="calendar__cells">
                      <div
                        v-for="day in calendarDays"
                        :key="day.date"
                        :class="['calendar__cell', day.class]"
                        @click="isEditing && selectDate(day)"
                      >
                        {{ day.day }}
                      </div>
                    </div>
                  </div>
                </template>
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Срок исполнения:
                    <span class="date-control">{{ isEditing ? (selectedDateStr || 'не выбран') : formattedDate }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p v-if="apiError" class="task-modal__error" role="alert">{{ apiError }}</p>

          <div class="pop-browse__btn-browse">
            <div class="btn-group">
              <template v-if="isEditing">
                <button
                  class="btn-browse__edit _btn-bg _hover01"
                  type="button"
                  :disabled="isSaving"
                  @click="saveTask"
                >
                  {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
                </button>
                <button class="btn-browse__delete _btn-bor _hover03" type="button" @click="cancelEdit">
                  Отменить
                </button>
              </template>
              <button
                v-else
                class="btn-browse__edit _btn-bor _hover03"
                type="button"
                @click="startEdit"
              >
                Редактировать задачу
              </button>
              <button
                class="btn-browse__delete _btn-bor _hover03"
                type="button"
                :disabled="isDeleting"
                @click="removeTask"
              >
                {{ isDeleting ? 'Удаление...' : 'Удалить задачу' }}
              </button>
            </div>
            <button class="btn-browse__close _btn-bg _hover01" type="button" @click="closeModal">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue'
import { columnStatuses } from '../data/statuses.js'

const props = defineProps({
  task: {
    type: Object,
    default: null
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const { updateTask, deleteTask } = inject('tasks')
const isEditing = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const apiError = ref('')
const draftDescription = ref('')
const draftStatus = ref('')
const draftDate = ref('')
const currentDate = ref(new Date())

const categoryTheme = computed(() => {
  const themes = {
    'Web Design': 'orange',
    Research: 'green',
    Copywriting: 'purple'
  }
  return themes[props.task?.topic] || 'orange'
})

const currentMonth = computed(() => {
  const month = currentDate.value.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })
  return month.charAt(0).toUpperCase() + month.slice(1).replace(/\sг\.$/, '')
})

const dateInputValue = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const selectedDateStr = computed(() => {
  if (!draftDate.value) return ''
  const [year, month, day] = draftDate.value.split('-')
  return `${day}.${month}.${year}`
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const days = []
  const previousMonthLastDay = new Date(year, month, 0).getDate()

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: previousMonthLastDay - i,
      date: new Date(year, month - 1, previousMonthLastDay - i),
      class: 'calendar__cell _other-month',
      isOtherMonth: true
    })
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isToday = date.toDateString() === new Date().toDateString()
    let classNames = 'calendar__cell _cell-day'
    if (isWeekend) classNames += ' _weekend'
    if (isToday) classNames += ' _current'
    if (draftDate.value === dateInputValue(date)) classNames += ' _active-day'

    days.push({
      day: i,
      date,
      class: classNames,
      isOtherMonth: false
    })
  }

  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      date: new Date(year, month + 1, i),
      class: 'calendar__cell _other-month',
      isOtherMonth: true
    })
  }

  return days
})

const selectDate = (day) => {
  if (!day.isOtherMonth) draftDate.value = dateInputValue(day.date)
}

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const formatDateInput = (value) => {
  if (!value) return ''
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (dateOnly) return `${dateOnly[1]}-${dateOnly[2]}-${dateOnly[3]}`

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formattedDate = computed(() => {
  const value = formatDateInput(props.task?.date)
  if (!value) return 'Не указана'
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year.slice(-2)}`
})

const resetDraft = () => {
  draftDescription.value = props.task?.description || ''
  draftStatus.value = props.task?.status || columnStatuses[0].status
  draftDate.value = formatDateInput(props.task?.date)
  if (draftDate.value) {
    const [year, month] = draftDate.value.split('-').map(Number)
    currentDate.value = new Date(year, month - 1, 1)
  } else {
    currentDate.value = new Date()
  }
  isEditing.value = false
  apiError.value = ''
}

watch(() => props.task, resetDraft, { immediate: true })

const startEdit = () => {
  resetDraft()
  isEditing.value = true
}

const cancelEdit = () => {
  resetDraft()
}

const closeModal = () => {
  isEditing.value = false
  apiError.value = ''
  emit('close')
}

const taskPayload = () => ({
  title: props.task.title,
  description: draftDescription.value,
  topic: props.task.topic,
  status: draftStatus.value,
  date: draftDate.value
    ? new Date(`${draftDate.value}T12:00:00`).toISOString()
    : ''
})

const saveTask = async () => {
  const id = props.task?._id ?? props.task?.id
  if (id === undefined || id === null) {
    apiError.value = 'Не удалось определить задачу'
    return
  }

  isSaving.value = true
  apiError.value = ''
  try {
    const result = await updateTask(id, taskPayload())
    if (!result.success) {
      apiError.value = result.error || 'Не удалось сохранить задачу'
      return
    }
    closeModal()
  } finally {
    isSaving.value = false
  }
}

const removeTask = async () => {
  const id = props.task?._id ?? props.task?.id
  if (id === undefined || id === null) {
    apiError.value = 'Не удалось определить задачу'
    return
  }

  isDeleting.value = true
  apiError.value = ''
  try {
    const result = await deleteTask(id)
    if (!result.success) {
      apiError.value = result.error || 'Не удалось удалить задачу'
      return
    }
    closeModal()
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.pop-browse.is-open {
  display: block;
}

.status__theme {
  cursor: pointer;
  background: transparent;
}

.status__theme--selected {
  background: #94a6be;
  color: #fff;
  border-color: #94a6be;
}

.status__theme--selected p {
  color: inherit;
}

.task-modal__error {
  margin-bottom: 12px;
  color: #e74c3c;
}

@media (max-width: 660px) {
  .pop-browse__content .theme-top {
    display: block;
  }

}
</style>
