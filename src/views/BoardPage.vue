<template>
  <div class="wrapper">
    <BaseHeader @create-task="isNewCardOpen = true" />
    <TaskDesk @open-task="activeTask = $event" />

    <TaskModal
      :task="selectedTask"
      :visible="Boolean(selectedTask)"
      @close="closeTask"
    />

    <NewCardModal :visible="isNewCardOpen" @close="isNewCardOpen = false" />
    <ExitModal :visible="showExit" @close="closeExit" />
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseHeader from '../components/BaseHeader.vue'
import TaskDesk from '../components/TaskDesk.vue'
import TaskModal from '../components/TaskModal.vue'
import NewCardModal from '../components/NewCardModal.vue'
import ExitModal from '../components/ExitModal.vue'

const props = defineProps({
  taskId: {
    type: [String, Number],
    default: null
  },
  showExit: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const { tasks } = inject('tasks')
const activeTask = ref(null)
const isNewCardOpen = ref(false)

const selectedTask = computed(() => {
  if (props.taskId !== null && props.taskId !== undefined) {
    return tasks.value.find((task) => String(task._id ?? task.id) === String(props.taskId)) || null
  }
  return activeTask.value
})

const closeTask = () => {
  activeTask.value = null
  if (props.taskId !== null && props.taskId !== undefined) router.push('/')
}

const closeExit = () => router.push('/')
</script>
