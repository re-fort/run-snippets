chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: 'Remove item from LocalStorage!',
  type: 'info',
  options: [
    { action: 'removeLocalStorage', param: [ { key: form.item } ] }
  ]
}})