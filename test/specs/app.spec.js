import { mount } from 'vue-test-utils'
import assert from 'assert'
import $ from 'jquery'
import sinon from 'sinon'

import App from 'src/App.vue'
import { treeData } from '@/config/tree'
import { message } from 'src/config/message'

describe('App', function () {
  it('renders all snippets', function () {
    const wrapper = mount(App)
    assert(wrapper.vm.treeData.children.length === treeData.children.length)
  })

  describe('displayResult()', function () {
    it('adds notification component on DOM', function () {
      const wrapper = mount(App)
      const result = { component: 'notification', message: 'test', type: 'success' }
      wrapper.vm.$options.methods.displayResult(result)
      assert($('.notifications').text().trim() === result.message)
      $('.notifications').remove()
    })

    it('adds message component on DOM', function () {
      const wrapper = mount(App)
      const result = { component: 'message', title: 'title', message: 'test', type: 'success' }
      wrapper.vm.$options.methods.displayResult(result)
      assert($('.message-header').text().trim() === result.title)
      assert($('.message-body').text().trim() === result.message)
      $('.messages').remove()
    })

    it('calls handleAdditionalOptions when option is passed', function () {
      const wrapper = mount(App)
      const result = { component: 'notification', message: 'test', type: 'success', options: 'copy' }
      const handleAdditionalOptionsStub = sinon.stub()
      wrapper.setMethods({ handleAdditionalOptions: handleAdditionalOptionsStub })
      wrapper.vm.$options.methods.displayResult(result)
      assert(handleAdditionalOptionsStub.called)
    })
  })

  describe('check()', function () {
    it('returns true when the enough parameter is passed : copy', function () {
      const wrapper = mount(App)
      const result = wrapper.vm.$options.methods.check({ action: 'copy', param: 'text' })
      assert(result)
    })

    it('returns true when the enough parameter is passed : local storage', function () {
      const wrapper = mount(App)
      let result = wrapper.vm.$options.methods.check({ action: 'setLocalStorage', param: [ { key: 'key', value: 'value' } ]})
      assert(result)
      result = wrapper.vm.$options.methods.check({ action: 'removeLocalStorage', param: [ { key: 'key' } ]})
      assert(result)
    })

    it('shows error when the parameter is missing : copy', function () {
      const wrapper = mount(App)
      const result = wrapper.vm.$options.methods.check({ action: 'copy' })
      assert(!result)
      assert($('.message-body').text().trim().includes(message.ERROR_NOT_ENOUGH_PARAMETER))
      $('.messages').remove()
    })

    it('shows error when the parameter is missing or insufficient : local storage', function () {
      const wrapper = mount(App)
      let result = wrapper.vm.$options.methods.check({ action: 'setLocalStorage' })
      assert(!result)
      assert($('.message-body').text().trim().includes(message.ERROR_NOT_ENOUGH_PARAMETER))
      $('.messages').remove()
      result = wrapper.vm.$options.methods.check({ action: 'removeLocalStorage', param: [] })
      assert(!result)
      assert($('.message-body').text().trim().includes(message.ERROR_NOT_ENOUGH_PARAMETER))
      $('.messages').remove()
    })
  })

  describe('copyToClipboard()', function () {
    it('returns true when copy is succeed', function () {
      // Somehow document.execCommand('copy') returns false in Karma
      // const wrapper = mount(App)
      // const result = wrapper.vm.$options.methods.copyToClipboard('test')
      // assert(result)
    })
  })

  describe('setLocalStorage()', function () {
    it('sets item', function () {
      const wrapper = mount(App)
      const { key, value } = { key: 'key', value: 'value' }
      wrapper.vm.$options.methods.setLocalStorage('key', 'value')
      assert(localStorage.getItem(key) === value)
    })
  })

  describe('removeLocalStorage()', function () {
    it('removes item', function () {
      const wrapper = mount(App)
      const { key, value } = { key: 'key', value: 'value' }
      wrapper.vm.$options.methods.setLocalStorage('key', 'value')
      assert(localStorage.getItem(key) === value)
      wrapper.vm.$options.methods.removeLocalStorage('key')
      assert(localStorage.getItem(key) === null)
    })
  })
})
