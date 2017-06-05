import { treeData } from './config/tree.js'

function autoRun (items) {
  if (isFolder(items)) autoRun(items.children)
  if (!Array.isArray(items)) return

  for (let item of items) {
    if (isFolder(item)) {
      autoRun(item.children)
    } else if (item.autoRun && checkDomain(item)) {
      executeScript(item)
    }
  }
}

function isFolder (item) {
  return item.children && item.children.length
}

function checkDomain (item) {
  if (!item.domain) return true
  return (new RegExp(item.domain, 'i')).test(location.href)
}

function executeScript (item) {
  require(`./snippets/${item.snippet}.js`)
}

autoRun(treeData)