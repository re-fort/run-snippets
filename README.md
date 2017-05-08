![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)

run-snippets
======================

Chrome and Firefox extension to run arbitrarily snippets.  
To use this extension, you have to add snippets manually and load builded package.  
Since bundle with `webpack`, you can import npm packages and use ES2015 syntax in your snippets.

[日本語](https://github.com/re-fort/run-snippets/blob/master/README_ja.md)

## demo
![screenshot](https://raw.githubusercontent.com/re-fort/run-snippets/master/demo/run-snippets.gif)

## Setup
```
git clone https://github.com/re-fort/run-snippets
cd run-snippets
npm install or yarn install
```

## Usage
- `vim src/config/tree.js`
- `touch src/snippets/your_snippet.js`
- `vim src/config/your_snippet.js`
- `npm run dev`
- `npm run build`

## npm scripts
- `npm run dev` start waching files with webpack
- `npm run build` minify and build with source map
- `npm run zip:firefox` create an xpi file for Firefox

## Config
### tree.js
|property|description|required|type|
|:-|:-|:-|:-|
|name|snippet name|yes|string|
|description|snippet description|no|string|
|open|open/close status of a folder|no|boolean|
|form|form name before executing the snippet|no|string|
|snippet|snippet's name to execute|yes(if it is not a folder)|string|
|domain|domain permitted to execute snippet|no|string(Regex)
|children|children element|no|array|

### your_snippet.js
To display snippet's result in Chrome(Firefox) extension, you have to send a message as below.
```js
chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: date.toString(),
  type: 'info'
}})
```

Here's `result` strucuture.

|property|description|required|type|
|:-|:-|:-|:-|
|component|component to display result|yes|string(notification or message)|
|message|message to display in result|yes|string|
|type|notification style to display in result|yes|string(info, success, warning, danger)|
|options|optional features|no|array|

The object to pass to the `options` array.

|action|parameter|
|:-|:-|
|copy|string(to be copied to clipboard)|
|setLocalStorage|array(Key and value to set to local storage)|

When using the input form, you can refer to the value entered in the form `form.id`.
You can refer to the value set in local storage `ls.key`.

### your_form.js
|property|description|required|type|
|:-|:-|:-|:-|
|type|input type|yes|string(text, checkbox, radio, select)|
|id|ID used for reference in the snippet|yes|string|
|label|label used for the description of input form|no|string|
|value|-|yes|string(text, checkbox) or array(radio, select)|

## Load your builded extension
### Chrome
1. access `chrome://extensions/`
1. click `Load unpacked extension`
1. select the `dist` folder
1. ready to use your custom extension :)

### Firefox
1. `npm run zip:firefox` after `npm run build`
1. access `https://addons.mozilla.org/en-US/developers/addon/submit/distribution`
1. sign your `run-snippets.xpi` and download it
1. drag-and-drop `run-snippets.xpi` in your browser
1. ready to use your custom extension :)