<template>
  <section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo" />
    <section class="main">
      <input
        data-testid="toggle-all"
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <TodoItem
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          @delete-todo="handleDeleteTodo"
          @edit-todo="handleEditTodo"
        />
      </ul>
    </section>
    <TodoFooter :todos="todos" @clear-completed="handleClearCompleted" />
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
  computed: {
    toggleAll: {
      get () {
        // 是否全选
        return this.todos.length && this.todos.every((item) => item.done);
      },
      set (value) {
        this.todos.forEach((item) => {
          item.done = value;
        });
      },
    },
    // 过滤数据
    filterTodos () {
      // 获取路由路径
      // 根据路由路径过滤数据
      const path = this.$route.path;
      switch (path) {
        //  / 所有的任务列表
        case '/':
          return this.todos;
          break;
        // /active 所有的未完成任务
        case '/active':
          return this.todos.filter((todo) => !todo.done);
          break;
        // /completed 所有的已完成任务
        case '/completed':
          return this.todos.filter((todo) => todo.done);
          break;
        default:
          return this.todos;
          break;
      }
    },
  },
  data () {
    return {
      todos: [],
    };
  },
  methods: {
    handleNewTodo (text) {
      const lastTodo = this.todos[this.todos.length - 1];
      this.todos.push({
        id: lastTodo ? lastTodo.id + 1 : 1,
        text,
        done: false,
      });
    },
    handleDeleteTodo (todoId) {
      const index = this.todos.findIndex((item) => item.id == todoId);
      if (index != -1) {
        this.todos.splice(index, 1);
      }
    },
    handleEditTodo ({ id, text }) {
      const todo = this.todos.find((item) => item.id == id);
      if (!todo) {
        return;
      }
      if (!text.trim().length) {
        // 执行删除操作
        this.handleDeleteTodo(id);
        return;
      }
      // 执行修改
      todo.text = text;
    },
    handleClearCompleted () {
      // 清除所有已完成任务
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].done) {
          // delete
          this.todos.splice(i, 1);
          i--;
        }
      }
    },
  },
};
</script>
