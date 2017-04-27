![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)

run-snippets
======================

任意のスニペットを実行するChrome & Firefox拡張機能です。  
この拡張機能を使用するには、手動でスニペットを作成し、ビルドしたパッケージを読み込む必要があります。  
`webpack`でバンドルしているので、スニペット内でnpmパッケージをインポートしたり、ES2015構文を使用可能です。

## デモ
![screenshot](https://raw.githubusercontent.com/re-fort/run-snippets/master/demo/run-snippets.gif)

## セットアップ
```
git clone https://github.com/re-fort/run-snippets
cd run-snippets
npm install or yarn install
```

## 使用方法
1. `vim src/config/tree.js`
1. `touch src/snippets/your_snippet.js`
1. `npm run dev`
1. `vim src/snippets/your_snippet.js`
1. `npm run build`

## npm scripts
- `npm run dev` webpackでのファイル監視を開始します。 
- `npm run build` 圧縮しソースマップ付きでビルドを行います。
- `npm run zip:firefox` Firefox用にxpiファイルを作成します。

## 設定
### tree.js
|プロパティ|説明|必須|型|
|:-|:-|:-|:-|
|name|スニペット名|はい|string|
|description|スニペットの説明|いいえ|string|
|open|フォルダの開閉状態|いいえ|boolean|
|snippet|実行するスニペット名|はい(フォルダでない場合)|string|
|domain|スニペットの実行を許可するドメイン|いいえ|string(Regex)
|children|子要素|いいえ|array|

### your_snippet.js
Chrome(Firefox)拡張機能でスニペットの実行結果を表示するには、次のようにメッセージを送信する必要があります。
```js
chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: date.toString(),
  type: 'info'
}})
```

実行結果の構造はこちらです。

|プロパティ|説明|必須|型|
|:-|:-|:-|:-|
|component|結果に表示するコンポーネント|はい|string(notification or message)|
|message|結果に表示するメッセージ|はい|string|
|type|結果に表示する通知スタイル|はい|string(info, success, warning, danger)|

## ビルドしたパッケージの読み込み
### Chrome
1. `chrome://extensions/`にアクセスします。
1. `パッケージ化されていない拡張機能を読み込む`をクリックします。
1. `dist `フォルダを選択します。
1. カスタム拡張機能を使用する準備ができました :)

### Firefox
1. `npm run build`を実行した後に`npm run zip:firefox`を実行します
1. `https://addons.mozilla.org/ja/developers/addon/submit/upload-unlisted`にアクセスします
1. `run-snippets.xpi`に署名を行い、ダウンロードします
1. `run-snippets.xpi`をブラウザにドラッグ&ドロップします
1. カスタム拡張機能を使用する準備ができました :)
