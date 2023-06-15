<template>
  <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
  <!-- 绑定class -->
  <li
    data-testid="todo-item"
    :class="{
      completed: todo.done,
      editing: isEditing === true
    }"
  >
    <div class="view">
      <!-- 绑定v-model -->
      <input v-model="todo.done" data-testid="todo-done" class="toggle" type="checkbox" />
      <!-- 绑定text -->
      <label
        data-testid="todo-text"
        @dblclick="isEditing = true"
      >{{ todo.text }}</label>
      <button data-testid="todo-del" class="destroy" @click="handleDelete(todo.id)"></button>
    </div>
    <input
      v-focus="isEditing"
      data-testid="todo-edit"
      class="edit"
      :value="todo.text"
      @blur="isEditing = false"
      @keyup.enter="handleEdit"
      @keyup.esc="handleCancelEdit"
    />
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
  },
  directives: {
    // 自动获取焦点
    focus (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    handleDelete (id) {
      this.$emit('delete-todo', id);
    },
    handleEdit (e) {
      this.$emit('edit-todo', {
        id: this.todo.id,
        text: e.target.value
      });
      // 取消编辑状态
      this.isEditing = false;
    },
    handleCancelEdit () {
      this.isEditing = false;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
