<script>
import Vue from 'vue'
import Message from 'vue-bulma-message'

const MessageComponent = Vue.extend(Message)

export const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 0,
  container: '.messages'
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}
</script>

<style lang="scss">
.messages {
  top: 0px !important;
}

.messages .message {
  right: 0% !important;
}
</style>