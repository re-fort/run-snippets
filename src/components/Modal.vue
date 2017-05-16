<template lang="pug">
  card-modal(:visible="true", transition="zoom", @ok="ok", @cancel="cancel")
    div(class="field" v-for="field in form")
      label(class="label") {{ field.label }}
      p(class="control" v-if="field.type === 'text'")
        input(class="input" type="text", :id="field.id", :value="field.value")
      p(class="control" v-else-if="field.type === 'checkbox'")
        label(class="checkbox")
          input(type="checkbox", :id="field.id")
          | {{ field.value }}
      p(class="control" v-else-if="field.type === 'radio'")
        label(class="radio" v-for="radio in field.value")
          input(type="radio", :name="field.id", :value="radio.value", :checked="true")
          | {{ radio.label }}
      p(class="control" v-else-if="field.type === 'select'")
        span(class="select")
          select(:id="field.id")
            option(v-for="option in field.value" :value="option.value") {{ option.label }}
      p(class="control" v-else-if="field.type === 'textarea'")
        textarea(class="textarea", :id="field.id") {{ field.value }}
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
  name: 'modal',
  components: {
    CardModal
  },
  props: {
    form: Array
  },
  data () {
    return {
      inputs: {},
      controls: ['text', 'checkbox', 'radio', 'select', 'textarea'],
      selector: {
        text: 'input[type="text"]',
        checkbox: 'input[type="checkbox"]',
        radio: 'input[type="radio"]:checked',
        select: 'select',
        textarea: 'textarea'
      }
    }
  },
  methods: {
    ok: function () {
      this.bindInputs()
      this.$emit('ok', this.inputs)
    },
    cancel: function () {
      this.$emit('cancel')
    },
    bindInputs: function () {
      for (let control of this.controls) {
        document.querySelectorAll(this.selector[control]).forEach(el => this.bind(control, el))
      }
    },
    bind: function (control, el) {
      switch (control) {
        case 'text':
        case 'select':
        case 'textarea':
          this.inputs[el.id] = el.value
          break
        case 'checkbox':
          this.inputs[el.id] = el.checked
          break
        case 'radio':
          this.inputs[el.name] = el.value
          break
      }
    }
  }
}
</script>

<style lang="scss">
.select select {
  padding-right: 2.5em;
}
</style>