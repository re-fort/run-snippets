<template lang="pug">
  card-modal(:visible="true", transition="zoom")
    h1(slot="header" v-if="form.header")
      p(class="modal-card-title", :class="form.header.class") {{ form.header.text }}
    div(class="field" v-for="field in form.fields" slot="body")
      label(class="label") {{ field.label }}
      p(class="control" v-if="field.type === 'text'", :class="getIconClass(field.icon)")
        input(class="input" type="text", :id="field.id", :value="field.value", :class="field.class", :disabled="field.disabled")
        span(class="icon" v-if="field.icon", :class="field.icon.class")
          i(class="fa", :class="field.icon.type")
      p(class="control" v-if="field.type === 'password'", :class="getIconClass(field.icon)")
        input(class="input" type="password", :id="field.id", :value="field.value", :class="field.class", :disabled="field.disabled")
        span(class="icon" v-if="field.icon", :class="field.icon.class")
          i(class="fa", :class="field.icon.type")
      p(class="control" v-else-if="field.type === 'checkbox'")
        label(class="checkbox", :disabled="field.disabled")
          input(type="checkbox", :id="field.id", :class="field.class", :disabled="field.disabled")
          | {{ field.value }}
      p(class="control" v-else-if="field.type === 'radio'")
        label(class="radio" v-for="radio in field.value", :disabled="field.disabled")
          input(type="radio", :name="field.id", :value="radio.value", :class="field.class", :checked="true", :disabled="field.disabled")
          | {{ radio.label }}
      p(class="control" v-else-if="field.type === 'select'")
        span(class="select", :class="[{ 'is-disabled': field.disabled }, field.class]")
          select(:id="field.id", :disabled="field.disabled")
            option(v-for="option in field.value" :value="option.value") {{ option.label }}
      p(class="control" v-else-if="field.type === 'textarea'")
        textarea(class="textarea", :id="field.id") {{ field.value }}
    template(slot="footer" v-if="form.footer")
      a(class="button", :class="form.footer.submit.class", @click="submit")
        | {{ form.footer.submit.text }}
      a(class="button", :class="form.footer.cancel.class", @click="cancel")
        | {{ form.footer.cancel.text }}
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
  name: 'modal',
  components: {
    CardModal
  },
  props: {
    form: Object
  },
  data () {
    return {
      inputs: {},
      controls: ['text', 'password','checkbox', 'radio', 'select', 'textarea'],
      selector: {
        text: 'input[type="text"]',
        password: 'input[type="password"]',
        checkbox: 'input[type="checkbox"]',
        radio: 'input[type="radio"]:checked',
        select: 'select',
        textarea: 'textarea'
      }
    }
  },
  methods: {
    submit: function () {
      this.bindInputs()
      this.$emit('submit', this.inputs)
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
    },
    getIconClass: function (icon) {
      if (!icon) return ''
      return icon.class.includes('is-right') ? 'has-icons-right' : 'has-icons-left'
    }
  }
}
</script>

<style lang="sass">
.select select
  padding-right: 2.5em
</style>
