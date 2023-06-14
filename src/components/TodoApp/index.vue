<template>
  <section class="todoapp">
    <TodoHeader />
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <TodoItem />
        <TodoItem />
      </ul>
    </section>
    <TodoFooter />
  </section>
</template>

<script>
import TodoHeader from './TodoHeader.vue';
import TodoFooter from './TodoFooter.vue';
import TodoItem from './TodoItem.vue';
export default {
  name: 'TodoApp',
  components: {
    TodoHeader,
    TodoFooter,
    TodoItem,
  }
}
</script>
