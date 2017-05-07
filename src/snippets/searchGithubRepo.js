if (form.newTab) {
  open(`https://github.com/search?l=${form.language}&q=${form.keyword}&s=${form.sort}&type=Repositories&utf8=%E2%9C%93`)
} else {
  location.href = `https://github.com/search?l=${form.language}&q=${form.keyword}&s=${form.sort}&type=Repositories&utf8=%E2%9C%93`
}

chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: 'Searching...',
  type: 'info'
}})