function square(num) {
  return new Promise((resolve, reject) => {
    resolve(num * num)
  })
}

square(10)
.then(num => {
  chrome.runtime.sendMessage({ result: {
    component: 'message',
    message: `Square: ${num}`,
    type: 'info'
  }})
})
