const el = document.querySelector('.vcard-username')

if (el === null) {
  chrome.runtime.sendMessage({ result: {
    component: 'notification',
    message: 'Cannot get username',
    type: 'danger'
  }})
} else {
  const username = document.querySelector('.vcard-username').innerHTML

  fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => {
    return response.json()
  })
  .then(json => {
    location.href = json[0].owner.avatar_url
    chrome.runtime.sendMessage({ result: '' })
  })
}