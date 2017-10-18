chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: 'Set LocalStorage!',
  type: 'info',
  options: [
    { action: 'setLocalStorage', param: [ { key: form.key, value: form.value } ] }
  ]
}})