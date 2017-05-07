chrome.runtime.sendMessage({ result: {
  component: 'message',
  message: "I'm nested child snippet!",
  type: 'warning'
}})