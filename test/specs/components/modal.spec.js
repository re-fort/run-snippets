import { mount } from 'vue-test-utils'
import assert from 'assert'

import Modal from 'src/components/Modal.vue'
import TestForm from '@/forms/testForm'

describe('Modal', function () {
  const FORM_TYPE = { TEXT: 0, PASSWORD: 1, CHECKBOX: 2, RADIO: 3, SELECT: 4, TEXTAREA: 5 }

  it('renders header', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })

    const header = wrapper.find('header h1 p')
    assert(header.hasClass(TestForm.header.class))
    assert(header.text() === TestForm.header.text)
  })

  it('renders text fields', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })
    const textField = wrapper.findAll('.field').at(FORM_TYPE.TEXT)
    assert(textField.find('.label').text() === TestForm.fields[FORM_TYPE.TEXT].label)
    assert(textField.find('#text').element._value === TestForm.fields[FORM_TYPE.TEXT].value)
    assert(textField.find('i').hasClass(TestForm.fields[FORM_TYPE.TEXT].icon.type))
    assert(textField.find('span').hasClass(TestForm.fields[FORM_TYPE.TEXT].icon.class))
  })

  it('renders password fields', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })
    const passwordField = wrapper.findAll('.field').at(FORM_TYPE.PASSWORD)
    assert(passwordField.find('.label').text() === TestForm.fields[FORM_TYPE.PASSWORD].label)
    assert(passwordField.find('#password').element._value === TestForm.fields[FORM_TYPE.PASSWORD].value)
    assert(passwordField.find('i').hasClass(TestForm.fields[FORM_TYPE.PASSWORD].icon.type))
    assert(passwordField.find('span').hasClass(TestForm.fields[FORM_TYPE.PASSWORD].icon.class))
  })

  it('renders checkbox fields', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })
    const checkBoxField = wrapper.findAll('.field').at(FORM_TYPE.CHECKBOX)
    assert(checkBoxField.find('.label').text() === TestForm.fields[FORM_TYPE.CHECKBOX].label)
    assert(checkBoxField.contains('#checkbox'))
    assert(checkBoxField.find('.checkbox').text() === TestForm.fields[FORM_TYPE.CHECKBOX].value)
  })

  it('renders radio fields', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })
    const radioField = wrapper.findAll('.field').at(FORM_TYPE.RADIO)
    assert(radioField.find('.label').text() === TestForm.fields[FORM_TYPE.RADIO].label)
    assert(radioField.findAll('.radio').at(0).text() === TestForm.fields[FORM_TYPE.RADIO].value[0].label)
    assert(radioField.findAll('[name="radio"]').at(0).element._value === TestForm.fields[FORM_TYPE.RADIO].value[0].value)
    assert(radioField.findAll('.radio').at(1).text() === TestForm.fields[FORM_TYPE.RADIO].value[1].label)
    assert(radioField.findAll('[name="radio"]').at(1).element._value === TestForm.fields[FORM_TYPE.RADIO].value[1].value)
  })

  it('renders select fields', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })
    const selectField = wrapper.findAll('.field').at(FORM_TYPE.SELECT)
    assert(selectField.find('.label').text() === TestForm.fields[FORM_TYPE.SELECT].label)
    assert(selectField.findAll('option').at(0).text() === TestForm.fields[FORM_TYPE.SELECT].value[0].label)
    assert(selectField.findAll('option').at(0).element._value === TestForm.fields[FORM_TYPE.SELECT].value[0].value)
    assert(selectField.findAll('option').at(1).text() === TestForm.fields[FORM_TYPE.SELECT].value[1].label)
    assert(selectField.findAll('option').at(1).element._value === TestForm.fields[FORM_TYPE.SELECT].value[1].value)
  })

  it('renders textarea fields', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })
    const textareaField = wrapper.findAll('.field').at(FORM_TYPE.TEXTAREA)
    assert(textareaField.find('.label').text() === TestForm.fields[FORM_TYPE.TEXTAREA].label)
    assert(textareaField.find('#textarea').text() === TestForm.fields[FORM_TYPE.TEXTAREA].value)
  })

  it('renders footer', function () {
    const wrapper = mount(Modal, { propsData: { form: TestForm } })
    const footer = wrapper.find('footer')
    assert(footer.findAll('a').at(0).hasClass(TestForm.footer.submit.class))
    assert(footer.findAll('a').at(0).text() === TestForm.footer.submit.text)
    assert(footer.findAll('a').at(1).hasClass(TestForm.footer.cancel.class))
    assert(footer.findAll('a').at(1).text() === TestForm.footer.cancel.text)
  })

  describe('submit()', function () {
    it('emits form value', function () {
      const wrapper = mount(Modal, { propsData: { form: TestForm } })
      const footer = wrapper.find('footer')
      const input = { text: 'new text', password: 'new password', checkbox: true, radio: '1', select: '2', textarea: 'new textarea' }
      wrapper.vm.$refs['text'][0].value = input.text
      wrapper.vm.$refs['password'][0].value = input.password
      wrapper.vm.$refs['checkbox'][0].checked = input.checkbox
      wrapper.vm.$refs['radio'][0].checked = input.radio
      wrapper.vm.$refs['select'][0].value = input.select
      wrapper.vm.$refs['textarea'][0].value = input.textarea

      footer.findAll('a').at(0).trigger('click')

      const emittedSubmit = wrapper.emitted().submit[0][0]
      assert(emittedSubmit.text === input.text)
      assert(emittedSubmit.password === input.password)
      assert(emittedSubmit.checkbox === input.checkbox)
      assert(emittedSubmit.radio === input.radio)
      assert(emittedSubmit.select === input.select)
      assert(emittedSubmit.textarea === input.textarea)
    })
  })

  describe('cancel()', function () {
    it('emits closing form', function () {
      const wrapper = mount(Modal, { propsData: { form: TestForm } })
      const footer = wrapper.find('footer')
      footer.findAll('a').at(1).trigger('click')

      assert(wrapper.emitted().cancel)
    })
  })
})
