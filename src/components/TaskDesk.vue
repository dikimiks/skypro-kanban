<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <!-- Колонка 1: Без статуса -->
          <TaskColumn column-title="Без статуса">
            <Task 
              theme="orange"
              theme-text="Web Design"
              task-title="Название задачи"
              date="30.10.23"
            />
            <Task 
              theme="green"
              theme-text="Research"
              task-title="Название задачи"
              date="30.10.23"
            />
            <Task 
              theme="orange"
              theme-text="Web Design"
              task-title="Название задачи"
              date="30.10.23"
            />
            <Task 
              theme="purple"
              theme-text="Copywriting"
              task-title="Название задачи"
              date="30.10.23"
            />
            <Task 
              theme="orange"
              theme-text="Web Design"
              task-title="Название задачи"
              date="30.10.23"
            />
          </TaskColumn>

          <!-- Колонка 2: Нужно сделать -->
          <TaskColumn column-title="Нужно сделать">
            <Task 
              theme="green"
              theme-text="Research"
              task-title="Название задачи"
              date="30.10.23"
            />
          </TaskColumn>

          <!-- Колонка 3: В работе -->
          <TaskColumn column-title="В работе">
            <Task 
              theme="green"
              theme-text="Research"
              task-title="Название задачи"
              date="30.10.23"
            />
            <Task 
              theme="purple"
              theme-text="Copywriting"
              task-title="Название задачи"
              date="30.10.23"
            />
            <Task 
              theme="orange"
              theme-text="Web Design"
              task-title="Название задачи"
              date="30.10.23"
            />
          </TaskColumn>

          <!-- Колонка 4: Тестирование -->
          <TaskColumn column-title="Тестирование">
            <Task 
              theme="green"
              theme-text="Research"
              task-title="Название задачи"
              date="30.10.23"
            />
          </TaskColumn>

          <!-- Колонка 5: Готово -->
          <TaskColumn column-title="Готово">
            <Task 
              theme="green"
              theme-text="Research"
              task-title="Название задачи"
              date="30.10.23"
            />
          </TaskColumn>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'
</script>