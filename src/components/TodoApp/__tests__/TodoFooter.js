import { createLocalVue, mount } from "@vue/test-utils";
import TodoFooter from '@/components/TodoApp/TodoFooter.vue';
import VueRouter from 'vue-router';
// 创建局部Vue
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter({
  linkActiveClass: 'selected'
});

describe('TodoFooter', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null;
  beforeEach(() => {
    const todos = [
      {id: 1, text: 'song', done: false},
      {id: 2, text: 'play', done: true},
      {id: 3, text: 'basketball', done: false},
    ]
    // 涉及到 样式断言 linkActiveClass: 'selected' 需要深渲染
    wrapper = mount(TodoFooter, {
      propsData: {
        todos
      },
      localVue,
      router
    });
  });

  test('测试剩余任务数量是否正确', () => {
    // 未完成数量
    const count = wrapper.vm.todos.filter(item => !item.done).length;
    const countEl = wrapper.find('strong[data-testid="done-todos-count"]');
    // 断言文本显示数字等于count
    expect(Number.parseInt(countEl.text())).toBe(count);
  });

  test('清除按钮是否展示', async () => {
    const clearBtn = wrapper.find('button[data-testid="clear-completed"]');
    // 因为初始数据有已完成状态 则clearBtn显示 有done为true 则断言按钮是已渲染状态
    expect(clearBtn.exists()).toBeTruthy();

    // 清除所有任务的完成状态 断言clearBtn不存在
    // 该写法有问题 不能直接修改propsData
    /* wrapper.vm.todos.forEach(item => {
      item.done = false;
    });
    await Vue.nextTick(); */
    wrapper = mount(TodoFooter, {
      propsData: {
        todos: [
          {id: 1, text: 'song', done: false},
          {id: 2, text: 'play', done: false},
          {id: 3, text: 'basketball', done: false},
        ]
      },
      localVue,
      router
    });
    expect(wrapper.find('button[data-testid="clear-completed"]').exists()).toBeFalsy();
  });

  test('点击清除按钮删除已完成任务', async () => {
    const clearBtn = wrapper.find('button[data-testid="clear-completed"]');
    await clearBtn.trigger('click');
    expect(wrapper.emitted()['clear-completed']).toBeTruthy();
  });

  test('测试导航链接的激活状态', async () => {
    // 找到所有导航链接
    const links = wrapper.findAllComponents({
      name: 'RouterLink'
    });
    router.push('/active');
    await localVue.nextTick();
    for (let i = 0; i < links.length; i++) {
      // 被wrapper包装过后的组件
      const link = links.at(i);
      if (link.vm.to === '/active') {
        expect(link.classes()).toEqual(["router-link-exact-active", "selected"]);
      } else {
        expect(link.classes('seleted')).toBeFalsy();
      }
    }
  });
})
