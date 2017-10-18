module.exports = {
  header: { text: 'header', class: 'header' },
  fields: [
    { type: 'text', id: 'text', label: 'label', value: 'text', icon: { type: 'fa-github', class: 'is-left' } },
    { type: 'password', id: 'password', label: 'label', value: 'password', icon: { type: 'fa-lock', class: 'is-right' } },
    { type: 'checkbox', id: 'checkbox', label: 'label', value: 'checkbox' },
    { type: 'radio', id: 'radio', label: 'label', value: [ { label: 'first', value: '1' }, { label: 'second', value: '2' } ] },
    { type: 'select', id: 'select', label: 'label', value: [ { label: 'first', value: '1' }, { label: 'second', value: '2' } ] },
    { type: 'textarea', id: 'textarea', label: 'label', value: 'textarea' },
  ],
  footer: {
    submit: { text: 'submit', class: 'submit' },
    cancel: { text: 'cancel', class: 'cancel' },
  },
}
