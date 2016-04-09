import Vue from 'vue'
import collection from '../../../../src/components/collection';

describe('collection', () => {
  const render = (store) => {
    return new Vue({
      template: '<div><collection :model="store"></collection></div>',
      components: { collection },
      data: {
        store
      }
    }).$mount();
  };

  it('should render correct contents', () => {
    const store = {
      title: 'hello world'
    };
    const vm = render(store);

    expect(vm.$el.querySelector('h2').textContent.trim()).toBe(store.title);
  });

});
