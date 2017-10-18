import { mount } from 'vue-test-utils'
import assert from 'assert'
import $ from 'jquery'

import TreeItem from 'src/components/TreeItem.vue'
import { message } from 'src/config/message'


describe('TreeItem', function () {
  const propsData = { model: { name: 'folder', open: true, children: [ { name: 'sub folder' , children: [ { name: 'snippet' } ] } ] } }

  it('renders folder', function () {
    const wrapper = mount(TreeItem, { propsData })
    assert(wrapper.findAll('i').at(0).hasClass('fa-folder-o'))
    assert(wrapper.findAll('i').at(1).hasClass('fa-folder-o'))
    assert(wrapper.findAll('span').at(1).text() === propsData.model.name)
    assert(wrapper.findAll('span').at(4).text() === propsData.model.children[0].name)
  })

  it('renders snippet', function () {
    const wrapper = mount(TreeItem, { propsData })
    assert(wrapper.findAll('span').at(6).text() === propsData.model.children[0].children[0].name)
  })

  describe('click()', function () {
    const propsData = { model: { open: true, children: [ { name: 'auto', description: 'auto', snippet: 'auto', autoRun: true } ] } }

    it('closes folder when opened folder is clicked', function () {
      const wrapper = mount(TreeItem, { propsData })
      wrapper.findAll('a').at(0).trigger('click')
      assert(!wrapper.vm.open)
    })

    it('shows error when clicking auto run snippet', function () {
      const wrapper = mount(TreeItem, { propsData })
      wrapper.findAll('a').at(1).trigger('click')
      assert(wrapper.emitted().result)
      assert(wrapper.emitted().result[0][0].message.includes(message.WARNING_AUTO_RUN_SNIPPET))
      $('.messages').remove()
    })
  })

  describe('run()', function () {
    const propsData = { model: { open: true, children: [ { name: 'auto', description: 'auto', snippet: 'auto', autoRun: true } ] } }

    it('closes folder when opened folder is clicked', function () {
      const wrapper = mount(TreeItem, { propsData })
      wrapper.findAll('a').at(0).trigger('click')
      assert(!wrapper.vm.open)
    })

    it('shows error when clicking auto run snippet', function () {
      const wrapper = mount(TreeItem, { propsData })
      wrapper.findAll('a').at(1).trigger('click')
      assert(wrapper.emitted().result)
      assert(wrapper.emitted().result[0][0].message.includes(message.WARNING_AUTO_RUN_SNIPPET))
      $('.messages').remove()
    })
  })

  describe('hasError()', function () {
    it('returns true when snippet is not defined', function () {
      const [hasError, error] =TreeItem.methods.hasError({})
      assert(hasError)
      assert(error.message.includes(message.ERROR_NOT_DEFINED_SNIPPET))
    })

    it('returns true when snippet domain is not matched url', function () {
      const [hasError, error] =TreeItem.methods.hasError({ snippet: 'snippet', domain: 'example.com' }, 'https://example2.com')
      assert(hasError)
      assert(error.message.includes(message.ERROR_NOT_MATCHED_DOMAIN))
    })

    it('returns false when there is no error', function () {
      const [hasError] =TreeItem.methods.hasError({ snippet: 'snippet', domain: 'example.com' }, 'https://example.com')
      assert(!hasError)
    })
  })
})
