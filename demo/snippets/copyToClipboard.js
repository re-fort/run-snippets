const date = new Date()

chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: 'Copy to clipboard!',
  type: 'info',
  options: [
    { action: 'copy', param: date.toString() }
  ]
}})