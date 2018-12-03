import Vue from 'vue'
import Vault from '@/components/World'

describe('Vault.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Vault)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('. h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
