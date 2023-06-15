import { shallowMount } from "@vue/test-utils";
import TodoItem from '@/components/TodoApp/TodoItem.vue'
describe('TodoItem.vue', () => {
  // 优化
  // 找回智能提示
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null;
  beforeEach(() => {
    const todo = {
      id: 1,
      text: 'play',
      done: true,
    }
    wrapper = shallowMount(TodoItem, {
      propsData: {
        todo
      }
    });
  });
  wrapper.
  test('text', () => {
    // 文本内容
    expect(wrapper.find('[data-testid="todo-text"]').text()).toBe(wrapper.vm.todo.text);
  });

  test('done', async () => {
    const done = wrapper.find('[data-testid="todo-done"]');
    const todoItem = wrapper.find('[data-testid="todo-item"]');
    // 选中状态
    expect(done.element.checked).toBeTruthy();
    // 选中新增class类名
    expect(todoItem.classes()).toContain('completed');

    // 更改选中状态
    await done.setChecked(false);
    expect(todoItem.classes('completed')).toBeFalsy();
  })
  /* test('todo-item show', () => {
    const todo = {
      id: 1,
      text: 'play',
      done: true,
    }
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo
      }
    });
    // 文本内容
    expect(wrapper.find('[data-testid="todo-text"]').text()).toBe(todo.text);
    // 选中状态
    expect(wrapper.find('[data-testid="todo-done"]').element.checked).toBeTruthy();
    // 选中新增class类名
    expect(wrapper.find('[data-testid="todo-item"]').classes()).toContain('completed');

    // 未选中状态
    // expect(wrapper.find('[data-testid="todo-done"]').element.checked).toBeFalsy();
    // expect(wrapper.find('[data-testid="todo-item"]').classes().length).toBe(0);

  }) */
})
