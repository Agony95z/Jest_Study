// 挂载组件
import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'

test('HelloWorld.vue', async () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: 'Hello world'
    }
  });
  // 找到count 的 p标签
  const countText = wrapper.find('[data-testid="count-text"]');
  const btn = wrapper.find('button');

  const emitBtn = wrapper.find('[data-testid="btn-emit"]');

  // 触发之前count为0
  expect(countText.text()).toBe('0');

  // 触发事件
  await btn.trigger('click');

  // 第1次触发emit
  await emitBtn.trigger('click');

  // 第2次触发emit
  wrapper.vm.$emit('handleClick');

  // 断言事件已经被触发
  expect(wrapper.emitted().handleClick).toBeTruthy();

  // 断言事件的有效数据 [ [ 'test123' ] ]
  expect(wrapper.emitted().handleClick[0][0]).toBe('test123');

  // 断言事件的数量
  expect(wrapper.emitted().handleClick.length).toBe(2);

  // await Vue.nextTick();

  expect(wrapper.vm.count).toBe(1);
  expect(countText.text()).toBe('1');
})

test.only('HelloWorld.vue', () => {
  // 浅渲染 只渲染HellWorld组件 子组件不渲染
  const shallowMountWrapper = shallowMount(HelloWorld);
  // 深渲染
  const mountWrapper = mount(HelloWorld);
  // console.log('shallowMountWrapper', shallowMountWrapper.html());
  // console.log('mountWrapper', mountWrapper.html());
})
