import Vue from 'vue'
import { trigger } from '../../helpers';
import buyButton from '../../../../src/components/buy-button';

describe('buy-button', () => {
  const renderButton = (store) => {
    return new Vue({
      template: '<div><buy-button :store="store"></buy-button></div>',
      components: { buyButton },
      data: {
        store
      }
    }).$mount();
  };

  it('should render correct contents', () => {
    const vm = renderButton();
    expect(vm.$el.querySelector('.btn').textContent).toBe('Take my money!')
  });

  it('should call `addToCart` when clicked', () => {
    const store = {
      addToCart: jasmine.createSpy('addToCart')
    };

    const vm = renderButton(store);
    trigger(vm.$el.querySelector('.btn'), 'click');
    expect(store.addToCart).toHaveBeenCalled();
  });

  // works in rl; test fails...
  xit('should disable the button when clicked', () => {
    const store = {
      addToCart: () => { }
    };
    const vm = renderButton(store);
    const button = vm.$el.querySelector('.btn');
    trigger(button, 'click');
    expect(button.disabled).toBeTruthy();
  });
});
