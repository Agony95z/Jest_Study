import { shallowMount } from "@vue/test-utils";
import TodoApp from '@/components/TodoApp/index.vue';
import TodoItem from '@/components/TodoApp/TodoItem.vue';
import Vue from 'vue';
describe('TodoApp', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null;
  beforeEach(async () => {
    const $route = {
      path: '/'
    }
    wrapper = shallowMount(TodoApp, {
      mocks: {
        $route
      }
    });
    const todos = [
      {id: 1, text: 'song', done: false},
      {id: 2, text: 'play', done: true},
      {id: 3, text: 'basketball', done: false},
    ]
    await wrapper.setData({
      todos
    })
  });
  test('测试往数组添加数据', () => {
    const text = 'play';
    // 执行handleNewTodo往todos中添加数据
    wrapper.vm.handleNewTodo(text);
    // 此时todos中新增了一条text数据
    const todo = wrapper.vm.todos.find(item => item.text === text);
    expect(todo.text).toBeTruthy();
  });

  // 测试列表展示
  test('测试组件数量是否和数组长度相等', async () => {
    expect(wrapper.findAllComponents(TodoItem).length).toBe(wrapper.vm.todos.length);
  });

  test('测试子传父删除功能', async () => {
    // 执行handleDeleteTodo
    await wrapper.vm.handleDeleteTodo(1);
    expect(wrapper.vm.todos.length).toBe(2);
    // dom更新是异步的 所以加上await
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2);
  });

  test('测试子传父删除功能--反向测试', async () => {
    // 执行handleDeleteTodo
    await wrapper.vm.handleDeleteTodo(111);
    expect(wrapper.vm.todos.length).toBe(3);
    // dom更新是异步的 所以加上await
    expect(wrapper.findAllComponents(TodoItem).length).toBe(3);
  });

  test('测试子传父编辑功能', async () => {
    const todo = {id: 2, text: 'jump'};
    // 执行 handleEditTodo
    await wrapper.vm.handleEditTodo(todo);
    // todos数组第一项的text改为jump
    expect(wrapper.vm.todos[1].text).toBe(todo.text);

    // 反向测试 当todo.text清空时 删除当前项
    todo.text = '';
    await wrapper.vm.handleEditTodo(todo);
    expect(wrapper.vm.todos.find(item => item.id === todo.id)).toBeFalsy();
  });

  test('测试全选', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]');
    // 设置全选
    toggleAll.setChecked();
    // 断言所有的子任务都被选中
    wrapper.vm.todos.forEach(item => {
      expect(item.done).toBeTruthy();
    })

    // 取消全选
    toggleAll.setChecked(false);
    wrapper.vm.todos.forEach(item => {
      expect(item.done).toBeFalsy();
    })
  });

  test('测试全选与子项联动', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]');
    // 让所有任务都变成选中状态
    wrapper.vm.todos.forEach(item => {
      item.done = true;
    })
    await Vue.nextTick();
    // 断言toggleAll也被选中
    expect(toggleAll.element.checked).toBeTruthy();
    // 取消某个任务
    wrapper.vm.todos[0].done = false;
    // 断言toggleAll未被选中
    await Vue.nextTick();
    expect(toggleAll.element.checked).toBe(false);
    // todos设置为空
    wrapper.vm.todos = [];
    // 断言toggleAll未被选中
    await Vue.nextTick();
    expect(toggleAll.element.checked).toBe(false);
  });

  test('清除已完成任务项', async () => {
    wrapper.vm.handleClearCompleted();
    await Vue.nextTick();
    expect(wrapper.vm.todos).toEqual([
      {id: 1, text: 'song', done: false},
      {id: 3, text: 'basketball', done: false},
    ]);
  });

  test('过滤数据', async () => {
    // 将路由导航到 /
    wrapper.vm.$route.path = '/';
    await Vue.nextTick();
    // 断言 filterTodos = 所有的任务
    expect(wrapper.vm.filterTodos).toEqual([
      {id: 1, text: 'song', done: false},
      {id: 2, text: 'play', done: true},
      {id: 3, text: 'basketball', done: false},
    ]);

    // 将路由导航到 /active
    wrapper.vm.$route.path = '/active';
    await Vue.nextTick();
    // 断言 filterTodos = 所有的未完成任务
    expect(wrapper.vm.filterTodos).toEqual([
      {id: 1, text: 'song', done: false},
      {id: 3, text: 'basketball', done: false},
    ]);

    // 将路由导航到 /completed
    wrapper.vm.$route.path = '/completed';
    await Vue.nextTick();
    // 断言 filterTodos = 所有的已完成任务
    expect(wrapper.vm.filterTodos).toEqual([
      {id: 2, text: 'play', done: true},
    ]);
  });
})
