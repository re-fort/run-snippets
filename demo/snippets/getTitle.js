import $ from 'jquery'

const message = $('title').text()

chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: message,
  type: 'success'
}})