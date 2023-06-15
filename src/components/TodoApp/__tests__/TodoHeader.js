import { shallowMount } from "@vue/test-utils";
import TodoHeader from '@/components/TodoApp/TodoHeader';
describe('TodoHeader.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount(TodoHeader);
  });
  test('new todo', async () => {
    const input = wrapper.find('input[data-testid="new-todo"]');
    const text = 'zhangweihai';
    // 模拟输入
    await input.setValue(text);
    // 模拟点击
    await input.trigger('keyup.enter');
    // 事件被触发
    expect(wrapper.emitted()['new-todo']).toBeTruthy();
    // 触发emit后 传出值为input输入值
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text);
    // 事件触发完成后输入框清空
    expect(input.element.value).toBe('');
   });

   test('快照测试-TodoHeader', () => {
    expect(wrapper.html()).toMatchSnapshot();
   });
})
