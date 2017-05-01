const date = new Date()

chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: 'Set LocalStorage!',
  type: 'info',
  options: [
    { action: 'copy', param: date.toString() },
    { action: 'setLocalStorage', param: ['datetime', date.toString()] }
  ]
}})