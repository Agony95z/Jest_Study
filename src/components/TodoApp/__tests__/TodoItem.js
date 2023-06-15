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
  });

  test('delete', async () => {
    const delBtn = wrapper.find('button[data-testid="todo-del"]');
    await delBtn.trigger('click');
    expect(wrapper.emitted()['delete-todo']).toBeTruthy();
    expect(wrapper.emitted()['delete-todo'][0][0]).toBe(wrapper.vm.todo.id);
  });

  test('双击编辑', async () => {
    const todoItem = wrapper.find('li[data-testid="todo-item"]');
    const label = wrapper.find('label[data-testid="todo-text"]');
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]');
    // 双击
    await label.trigger('dblclick');
    expect(todoItem.classes()).toContain('editing');
    // input失去焦点
    await todoEdit.trigger('blur');
    expect(todoItem.classes('editing')).toBeFalsy();
  });

  test('保存编辑', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]');
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]');
    // 双击
    await label.trigger('dblclick');
    // 编辑文本框中的内容展示
    expect(todoEdit.element.value).toBe(wrapper.vm.todo.text);
    // 修改文本框的值
    const text = 'hello';
    todoEdit.setValue(text);
    // 回车保存
    await todoEdit.trigger('keyup.enter');
    // 断言数据被修改
    expect(wrapper.emitted()['edit-todo']).toBeTruthy();
    expect(wrapper.emitted()['edit-todo'][0][0]).toEqual({
      id: wrapper.vm.todo.id,
      text
    });
    // 点击回车后 取消编辑状态
    expect(wrapper.vm.isEditing).toBeFalsy();
  });
  test('取消编辑', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]');
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]');
    // 双击
    await label.trigger('dblclick');
    // text备份
    const text = wrapper.vm.todo.text;
    // 设置值
    todoEdit.setValue('随便任何输入内容');
    // 触发取消
    await todoEdit.trigger('keyup.esc');
    // 验证字段没有被修改
    expect(wrapper.vm.todo.text).toBe(text);
    // 验证编辑状态被取消
    expect(wrapper.vm.isEditing).toBeFalsy();
  });
})
