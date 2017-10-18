![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)
[![CircleCI](https://circleci.com/gh/re-fort/run-snippets.svg?style=shield)](https://circleci.com/gh/re-fort/run-snippets)
![Chrome passing](https://img.shields.io/badge/chrome-passing-brightgreen.svg?style=flat)
![Firefox passing](https://img.shields.io/badge/firefox-passing-brightgreen.svg?style=flat)

run-snippets
======================

[![Greenkeeper badge](https://badges.greenkeeper.io/re-fort/run-snippets.svg)](https://greenkeeper.io/)

Chrome and Firefox extension to run arbitrarily snippets.
To use this extension, you have to add snippets manually and load a built package.
Since it's bundled with `webpack`, you can import npm packages and use ES2015 syntax in your snippets.
Refer to the [demo](https://github.com/re-fort/run-snippets/tree/master/demo) folder for an implementation sample.

[日本語](https://github.com/re-fort/run-snippets/blob/master/README_ja.md)

## demo
![screenshot](https://user-images.githubusercontent.com/3705391/31721937-aef4056e-b455-11e7-892e-23726725dc14.gif)

## Setup
```
git clone https://github.com/re-fort/run-snippets
cd run-snippets
npm install or yarn install
```

## Usage
- `vim src/config/tree.js`
- `touch src/snippets/your_snippet.js`
- `vim src/snippets/your_snippet.js`
- `npm run dev`
- `npm run build`

## npm scripts
- `npm run dev` start watching files with webpack
- `npm run build` minify and build with source map
- `npm run zip:firefox` create xpi file for Firefox
- `npm run zip:chrome` create zip file to publish Chrome extension

## Config
### tree.js
|property|description|required|type|
|:-|:-|:-|:-|
|name|snippet name|yes|string|
|description|snippet description|no|string|
|open|whether to open the folder in its initial state|no|boolean|
|form|form name before executing the snippet|no|string|
|snippet|snippet name to execute|yes(only if it is not a folder)|string|
|domain|domain permitted to execute snippet|no|string(Regex)|
|autoRun|whether to run snippet automatically(only if it matches to domain permitted)|no|boolean|
|children|children element|no|array|

### your_snippet.js
To display snippet result in Chrome(Firefox) extension, you have to send a message as below.
```js
chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: new Date().toString(),
  type: 'info'
}})
```

Here's `result` structure.

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
|setLocalStorage|array(key and value to set to local storage)|
|removeLocalStorage|array(key to remove from local storage)|

When using the input form, you can refer to the value entered in the form `form.id`.
You can refer to the value set in local storage `ls.key`.

### your_form.js
The form consists of three elements.

|property|description|required|type|
|:-|:-|:-|:-|
|header|header element|no|object|
|fields|fields element|yes|array|
|footer|footer element|no|object|

- header

  |property|description|required|type|
  |:-|:-|:-|:-|
  |text|title|no|string|
  |class|class attribute|no|string|

- fields

  |property|description|required|type|
  |:-|:-|:-|:-|
  |type|input type|yes|string(text, password, checkbox, radio, select, textarea)|
  |id|ID used for reference in the snippet|yes|string|
  |class|class attribute|no|string|
  |label|label used for the description of input form|no|string|
  |value|-|yes|string(text, checkbox, textarea) or array(radio, select)|
  |disabled|-|no|boolean|
  |icon|[Font Awesome](http://fontawesome.io/icons/) icon|no|object|

  - icon

    |property|description|required|type|
    |:-|:-|:-|:-|
    |type|icon type|yes|string(e.g. fa-github)|
    |class|class attribute|yes|string(is-left or is-right)|

- footer

  |property|description|required|type|
  |:-|:-|:-|:-|
  |submit|submit button|no|object(text, class)|
  |cancel|cancel button|no|object(text, class)|

  - submit

    |property|description|required|type|
    |:-|:-|:-|:-|
    |text|text|no|string(default:`OK`)|
    |class|class attribute|no|string(default:`is-primary`)|

  - cancel

    |property|description|required|type|
    |:-|:-|:-|:-|
    |text|text|no|string(default:`cancel`)|
    |class|class attribute|no|string|

### Content Scripts
When setting `autoRun` option to `true` in `tree.js`, the snippet is executed as `Content Scripts`.

## Customize
### Bulma
Edit `bulma.sass` and you can easily customize Bulma with your own colors and variables.

## Load your built extension
### Chrome
1. Go to `chrome://extensions/`
1. Click `Load unpacked extension`
1. Select the `dist` folder
1. Ready to use your custom extension :)

### Firefox
1. `npm run zip:firefox` after `npm run build`
1. Go to `https://addons.mozilla.org/en-US/developers/addon/submit/distribution`
1. Sign your `run-snippets.xpi` and download it
1. Drag-and-drop `run-snippets.xpi` in your browser
1. Ready to use your custom extension :)
