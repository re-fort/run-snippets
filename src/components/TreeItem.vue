<template lang="pug">
  li
    div(:class="{'is-loading': !isFolder && isRunning}", class="control")
      tooltip(:label="model.description", :size="getTooltipSize", placement="top-right")
        a(:class="{bold: isFolder, 'menu-label': isFolder}", @click="click")
          span(v-if="isFolder" class="icon is-small")
            i(class="fa fa-folder-o")
          span {{ model.name }}
          span(v-if="isFolder")
            | [{{ open ? '-' : '+' }}]
      ul(class="menu-list", v-show="open", v-if="isFolder")
        tree-item(
          v-for="model in model.children",
          :key="model",
          :model="model",
          @result="callParent"
        )
</template>

<script>
import { message } from '../config/message.js'
import Tooltip from 'vue-bulma-tooltip'

export default {
  name: 'tree-item',
  components: {
    Tooltip
  },
  props: {
    model: Object
  },
  data () {
    return {
      open: this.model.open ? this.model.open : false,
      isRunning: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    },
    getTooltipSize: function () {
      return this.model.description && this.model.description.length > 20 ? 'large' : 'medium' 
    }
  },
  methods: {
    click: function () {
      if (this.isFolder) {
        this.toggle()
      } else {
        this.run()
      }
    },
    toggle: function () {
      this.open = !this.open
    },
    run: function () {
      this.checkBefore()
      .then(url => {
        if (this.check(url)) {
          this.addListener()
          this.isRunning = true
          chrome.tabs.query({ active: true }, (tab) => {
            chrome.tabs.executeScript(tab[0].id, { file: `./snippets/${this.model.snippet}.js` })
          })
        }
      })
      .catch(e => {
        console.error(e)
      })
    },
    checkBefore: function () {
      return new Promise((resolve, reject) => {
        if (this.model.domain) {
          chrome.tabs.query({ active: true }, (tab) => {
            resolve(tab[0].url)
          })
        } else {
          resolve()
        }
      })
    },
    check: function (url) {
      let error = { component: 'message', type: 'danger' }

      if (typeof this.model.snippet === 'undefined') {
        error.message = `${message.ERROR_NOT_DEFINED_SNIPPET}`
        this.$emit('result', error)
        return false
      }
      
      if (this.model.domain && url.match(new RegExp(this.model.domain, 'i')) === null) {
        error.message = `${message.ERROR_NOT_MATCHED_DOMAIN}: ${this.model.domain}`
        this.$emit('result', error)
        return false
      }

      return true
    },
    addListener: function () {
      const _this = this
      chrome.runtime.onMessage.addListener(
        function listener(request){
          chrome.runtime.onMessage.removeListener(listener);
          _this.$emit('result', request.result)
          _this.isRunning = false
        }
      )
    },
    callParent: function (result) {
      this.$emit('result', result)
    }
  }
}
</script>

<style lang="scss">
.bold {
  font-weight: bold;
}

ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: none;
  cursor: pointer;
}
</style>