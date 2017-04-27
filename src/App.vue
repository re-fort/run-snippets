<template lang="pug">
  div(id="app")
    aside(class="menu")
      ul
        tree-item(:model="treeData", @result="displayResult")
</template>

<script>
import Vue from 'vue'
import TreeItem from './components/TreeItem.vue'
import { treeData } from './config/tree.js'
import { openNotification } from './components/Notification.vue'
import { openMessage } from './components/Message.vue'

export default {
  name: 'app',
  components: {
    'tree-item': TreeItem
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
    },

  }
}
</script>

<style lang="scss">
body {
  margin-top: 20px;
  min-width: 600px;
  min-height: 400px;
}
</style>
