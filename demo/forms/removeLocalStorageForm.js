const options = () => {
  return Object.keys(localStorage).map(key => {
    return { label: key , value: key }
  })
}

module.exports = {
  fields: [
    { type: 'select', id: 'item', label: 'LocalStorage', value: options() }
  ],
  footer: {
    submit: { text: 'delete', class: 'is-danger' }
  }
}