const date = new Date()

chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: date.toString(),
  type: 'info'
}})

