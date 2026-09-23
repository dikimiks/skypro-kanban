<template>
  <div class="pop-new-card" id="popNewCard" style="display: none;">
    <div class="pop-new-card__container">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <a href="#" class="pop-new-card__close" @click.prevent="closeModal">✖</a>
          
          <div v-if="apiError" class="error-message">{{ apiError }}</div>
          
          <div class="pop-new-card__wrap">
            <div class="pop-new-card__form form-new">
              <div class="form-new__block">
                <label class="subttl">Название задачи</label>
                <input
                  class="form-new__input"
                  type="text"
                  v-model="taskTitle"
                  placeholder="Введите название задачи..."
                />
              </div>
              
              <div class="form-new__block">
                <label class="subttl">Описание задачи</label>
                <textarea
                  class="form-new__area"
                  v-model="taskDescription"
                  placeholder="Введите описание задачи..."
                ></textarea>
              </div>
            </div>

            <div class="pop-new-card__calendar calendar">
              <p class="calendar__ttl subttl">Даты</p>
              <div class="calendar__block">
                <div class="calendar__nav">
                  <div class="calendar__month">{{ currentMonth }}</div>
                  <div class="nav__actions">
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
                      @click="selectDate(day)"
                    >
                      {{ day.day }}
                    </div>
                  </div>
                </div>
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Срок исполнения:
                    <span class="date-control">{{ selectedDateStr || 'не выбран' }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="pop-new-card__categories categories">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__themes">
              <div 
                class="categories__theme _orange" 
                :class="{ '_active-category': selectedCategory === 'orange' }"
                @click="selectedCategory = 'orange'"
              >
                <p class="_orange">Web Design</p>
              </div>
              <div 
                class="categories__theme _green"
                :class="{ '_active-category': selectedCategory === 'green' }"
                @click="selectedCategory = 'green'"
              >
                <p class="_green">Research</p>
              </div>
              <div 
                class="categories__theme _purple"
                :class="{ '_active-category': selectedCategory === 'purple' }"
                @click="selectedCategory = 'purple'"
              >
                <p class="_purple">Copywriting</p>
              </div>
            </div>
          </div>

          <button class="form-new__create _hover01" @click="createTask" :disabled="isCreating">
            {{ isCreating ? 'Создание...' : 'Создать задачу' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

const emit = defineEmits(['task-created'])

// Получаем функцию создания задачи из provide
const { addTask } = inject('tasks')

const taskTitle = ref('')
const taskDescription = ref('')
const selectedCategory = ref('orange')
const selectedDate = ref('')
const isCreating = ref(false)
const apiError = ref('')

// Календарь
const currentDate = ref(new Date())
const currentMonth = computed(() => {
  return currentDate.value.toLocaleString('ru', { month: 'long', year: 'numeric' })
})

const selectedDateStr = computed(() => {
  return selectedDate.value || ''
})

const formatDate = (date) => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const days = []
  
  // Дни предыдущего месяца
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      date: new Date(year, month - 1, prevMonthLastDay - i),
      class: 'calendar__cell _other-month',
      isOtherMonth: true
    })
  }
  
  // Дни текущего месяца
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isToday = date.toDateString() === new Date().toDateString()
    
    let classNames = 'calendar__cell _cell-day'
    if (isWeekend) classNames += ' _weekend'
    if (isToday) classNames += ' _current'
    if (selectedDate.value === formatDate(date)) classNames += ' _active-day'
    
    days.push({
      day: i,
      date: date,
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
  if (!day.isOtherMonth) {
    selectedDate.value = formatDate(day.date)
  }
}

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const getCategoryText = (color) => {
  const categories = {
    orange: 'Web Design',
    green: 'Research',
    purple: 'Copywriting'
  }
  return categories[color] || 'Web Design'
}

const closeModal = () => {
  const modal = document.getElementById('popNewCard')
  if (modal) {
    modal.style.display = 'none'
  }
  taskTitle.value = ''
  taskDescription.value = ''
  selectedCategory.value = 'orange'
  selectedDate.value = ''
  apiError.value = ''
}

const createTask = async () => {
  if (!taskTitle.value) {
    apiError.value = 'Введите название задачи'
    return
  }
  
  isCreating.value = true
  apiError.value = ''
  
  try {
    const taskData = {
      title: taskTitle.value,
      description: taskDescription.value || '',
      topic: getCategoryText(selectedCategory.value),
      status: "Без статуса",
      date: selectedDate.value ? new Date(selectedDate.value).toISOString() : new Date().toISOString()
    }
    
    // Используем inject вместо прямого вызова API
    const result = await addTask(taskData)
    
    if (result.success) {
      emit('task-created')
      closeModal()
    } else {
      apiError.value = result.error || 'Ошибка создания задачи'
    }
  } catch (error) {
    apiError.value = error.error || 'Ошибка создания задачи'
  } finally {
    isCreating.value = false
  }
}
</script>