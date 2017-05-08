![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)

run-snippets
======================

任意のスニペットを実行するChrome & Firefox拡張機能です。  
この拡張機能を使用するには、手動でスニペットを作成し、ビルドしたパッケージを読み込む必要があります。  
`webpack`でバンドルしているので、スニペット内でnpmパッケージをインポートしたり、ES2015構文を使用可能です。  
デモ実装は[demo](https://github.com/re-fort/run-snippets/tree/demo)ブランチを参照してください。

## デモ
![screenshot](https://raw.githubusercontent.com/re-fort/run-snippets/demo/demo/run-snippets.gif)

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
|form|スニペット実行前に入力するフォーム名|いいえ|string|
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

`result`の構造はこちらです。

|プロパティ|説明|必須|型|
|:-|:-|:-|:-|
|component|結果に表示するコンポーネント|はい|string(notification or message)|
|message|結果に表示するメッセージ|はい|string|
|type|結果に表示する通知スタイル|はい|string(info, success, warning, danger)|
|options|オプション機能|いいえ|array|

`options`の配列に渡すオブジェクトです。

|action|parameter|
|:-|:-|
|copy|string(クリップボードにコピーする文字列)|
|setLocalStorage|array(Local Storageにセットするキー、値)|

入力フォームを使用した場合、`form.id`といった形式で入力した値を参照できます。
ローカルストレージに設定した値は、`ls.key`といった形式で参照できます。

### your_form.js
|プロパティ|説明|必須|型|
|:-|:-|:-|:-|
|type|入力形式|はい|string(text, checkbox, radio, select)|
|id|スニペット内で参照するために使うID|はい|string|
|label|項目の説明に使用するラベル|いいえ|string|
|value|値|はい|string(text, checkbox) or array(radio, select)|

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
