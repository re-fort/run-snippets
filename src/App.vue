<template lang="pug">
  div(id="app")
    aside(class="menu")
      ul
        tree-item(:model="treeData", @result="displayResult")
</template>

<script>
import Vue from 'vue'
import TreeItem from './components/TreeItem.vue'
import { treeData } from '@/config/tree.js'
import { message } from './config/message.js'
import { openNotification } from './components/Notification.vue'
import { openMessage } from './components/Message.vue'

export default {
  name: 'app',
  components: {
    TreeItem
  },
  data () {
    return {
      treeData: treeData
    }
  },
  methods: {
    displayResult: function (result) {
      if (result.component === 'notification') {
        openNotification({
          title: result.title,
          message: result.message,
          type: result.type
        })
      }
      if (result.component === 'message') {
        openMessage({
          title: result.title,
          message: result.message,
          type: result.type,
          duration: 0,
          showCloseButton: true
        })
      }
      if (result.options) {
        this.handleAdditionalOptions(result.options)
      }
    },
    handleAdditionalOptions: function (options) {
      for (let option of options) {
        if (!this.check(option)) break

        if (option.action === 'copy') {
          this.copyToClipboard(option.param)
        }
        if (option.action === 'setLocalStorage') {
          for (let param of option.param) { this.setLocalStorage(param.key, param.value) }
        }
        if (option.action === 'removeLocalStorage') {
          for (let param of option.param) { this.removeLocalStorage(param.key) }
        }
      }
    },
    check: function (option) {
      let error = { component: 'message', type: 'danger' }

      if (option.action === 'copy') {
        if (!option.param) {
          error.message = `${message.ERROR_NOT_ENOUGH_PARAMETER}: ${option.action}`
          this.displayResult(error)
          return false
        }
      }
      if (option.action === 'setLocalStorage' || option.action === 'removeLocalStorage') {
        if (!option.param || option.param.length < 1) {
          error.message = `${message.ERROR_NOT_ENOUGH_PARAMETER}: ${option.action}`
          this.displayResult(error)
          return false
        }
      }
      return true
    },
    copyToClipboard: function (text) {
      let input = document.createElement('textarea')
      document.body.appendChild(input)
      input.value = text
      input.focus()
      input.select()
      let result = document.execCommand('copy')
      input.remove()
      return result
    },
    setLocalStorage: function (key, value) {
      localStorage.setItem(key, value)
    },
    removeLocalStorage: function (key) {
      localStorage.removeItem(key)
    }
  }
}
</script>

<style lang="sass">
body
  margin-top: 20px
  min-width: 600px
  min-height: 400px

.messages
  top: 0px !important

.messages .message
  right: 0% !important

.notifications
  top: 0px !important
</style>
