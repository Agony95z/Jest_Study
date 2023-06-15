<template>
  <section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo" />
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
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
  },
  data () {
    return {
      todos: []
    }
  },
  methods: {
    handleNewTodo (text) {
      const lastTodo = this.todos[this.todos.length - 1];
      this.todos.push({
        id: lastTodo ? lastTodo.id + 1 : 1,
        text,
        done: false
      });
    }
  }
}
</script>
