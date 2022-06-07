import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App.vue', () => {
  let wrapper: Wrapper<Vue, Element> | null;

  beforeEach(() => {
    wrapper = mount(App, {
      localVue,
      stubs: ['router-link', 'router-view'],
      attachTo: document.body
    });
  });

  afterEach(() => {
    wrapper!.destroy();
  });

  it('render app', () => {
    expect(wrapper?.exists()).toBe(true);
  });
});
