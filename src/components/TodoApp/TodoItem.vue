<template>
  <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
  <!-- 绑定class -->
  <li data-testid="todo-item" :class="{completed: todo.done}">
    <div class="view">
      <!-- 绑定v-model -->
      <input v-model="todo.done" data-testid="todo-done" class="toggle" type="checkbox" />
      <!-- 绑定text -->
      <label data-testid="todo-text">{{ todo.text }}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Rule the web" />
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
