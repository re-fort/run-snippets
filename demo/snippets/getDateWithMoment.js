import moment from 'moment'

const title = moment.locale()
const message = moment().format('llll')

chrome.runtime.sendMessage({ result: {
  component: 'notification',
  title: title,
  message: message,
  type: 'info'
}})