<template lang="pug">
  li
    div(:class="{'is-loading': !isFolder && isRunning}", class="control")
      modal(:visible="show", :form="form", v-show="show", @submit="runSnippet", @cancel="closeModal")
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
import Modal from './Modal.vue'

export default {
  name: 'tree-item',
  components: {
    Tooltip,
    Modal
  },
  props: {
    model: Object
  },
  data () {
    return {
      open: this.model.open ? this.model.open : false,
      isRunning: false,
      show: false,
      form: {}
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
      if (this.model.form) {
        this.showModal()
      } else {
        this.runSnippet()
      }
    },
    runSnippet: function (param) {
      if (this.show) this.show = false
      this.checkBefore()
      .then(url => {
        if (this.check(url)) {
          this.addListener()
          this.isRunning = true
          chrome.tabs.query({ active: true }, (tab) => {
            chrome.tabs.executeScript(tab[0].id, { code: this.injectionCode(param) }, () => {
              chrome.tabs.executeScript(tab[0].id, { file: `./snippets/${this.model.snippet}.js` })
            })
          })
        }
      })
      .catch(e => {
        console.error(e)
      })
    },
    injectionCode: function (param) {
      return this.injectionForm(param) + this.injectionLocalStorage()
    },
    injectionForm: function (param) {
      return `var form = ${JSON.stringify(param)};`
    },
    injectionLocalStorage: function () {
      let obj = {}
      Object.keys(localStorage).forEach(key => { obj[key] = localStorage[key] })
      return `var ls = ${JSON.stringify(obj)};`
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
    },
    showModal: function () {
      let defaultForm = { header: {}, footer: { submit: { text: 'OK', class: 'is-primary  ' }, cancel: { text: 'cancel' } } }
      this.form = this.mergeDeep(defaultForm, require(`../forms/${this.model.form}.js`))
      this.show = true
      // delete cache(use template literal instead of variable)
      delete require.cache[require.resolve(`../forms/${this.model.form}.js`)]
    },
    closeModal: function () {
      this.show = false
    },
    isObject: function (item) {
      return (item && typeof item === 'object' && !Array.isArray(item))
    },
    mergeDeep: function (target, ...sources) {
      if (!sources.length) return target
      const source = sources.shift()

      if (this.isObject(target) && this.isObject(source)) {
        for (const key in source) {
          if (this.isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} })
            this.mergeDeep(target[key], source[key])
          } else {
            Object.assign(target, { [key]: source[key] })
          }
        }
      }

      return this.mergeDeep(target, ...sources)
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