import { shallowMount } from "@vue/test-utils";
import TodoApp from '@/components/TodoApp/index.vue';
import TodoItem from '@/components/TodoApp/TodoItem.vue'
describe('TodoApp', () => {
  test('new todo', () => {
    const wrapper = shallowMount(TodoApp);
    const text = 'play';
    wrapper.vm.handleNewTodo(text);
    const todo = wrapper.vm.todos.find(item => item.text === text);
    expect(todo.text).toBeTruthy();
  })

  // 测试列表展示
  test('todo list', async () => {
    const wrapper = shallowMount(TodoApp);

    // 写法1
    const todos = [
      {id: 1, text: 'song', done: false},
      {id: 2, text: 'play', done: true},
      {id: 3, text: 'basketball', done: false},
    ]
    await wrapper.setData({
      todos
    })
    expect(wrapper.findAllComponents(TodoItem).length).toBe(todos.length);
    // 写法2
    /* wrapper.vm.todos = [
      {id: 1, text: 'song', done: false},
      {id: 2, text: 'play', done: true},
      {id: 3, text: 'basketball', done: false},
    ]
    await Vue.nextTick() */
  })
})
