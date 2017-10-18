![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)
[![CircleCI](https://circleci.com/gh/re-fort/run-snippets.svg?style=shield)](https://circleci.com/gh/re-fort/run-snippets)
![Chrome passing](https://img.shields.io/badge/chrome-passing-brightgreen.svg?style=flat)
![Firefox passing](https://img.shields.io/badge/firefox-passing-brightgreen.svg?style=flat)

run-snippets
======================

任意のスニペットを実行するChrome & Firefox拡張機能です。
この拡張機能を使用するには、手動でスニペットを作成し、ビルドしたパッケージを読み込む必要があります。
`webpack`でバンドルしているので、スニペット内でnpmパッケージをインポートしたり、ES2015構文を使用可能です。
デモ実装は[demo](https://github.com/re-fort/run-snippets/tree/master/demo)フォルダを参照してください。

## デモ
![screenshot](https://user-images.githubusercontent.com/3705391/31721937-aef4056e-b455-11e7-892e-23726725dc14.gif)

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
- `npm run zip:chrome` Chrome用にzipファイルを作成します。

## 設定
### tree.js
|プロパティ|説明|必須|型|
|:-|:-|:-|:-|
|name|スニペット名|はい|string|
|description|スニペットの説明|いいえ|string|
|open|フォルダを初期状態で開くか|いいえ|boolean|
|form|スニペット実行前に入力するフォーム名|いいえ|string|
|snippet|実行するスニペット名|はい(フォルダでない場合)|string|
|domain|スニペットの実行を許可するドメイン|いいえ|string(Regex)|
|autoRun|スニペットを自動実行するか(実行許可ドメインに該当する場合)|いいえ|boolean|
|children|子要素|いいえ|array|

### your_snippet.js
Chrome(Firefox)拡張機能でスニペットの実行結果を表示するには、次のようにメッセージを送信する必要があります。
```js
chrome.runtime.sendMessage({ result: {
  component: 'notification',
  message: new Date().toString(),
  type: 'info'
}})
```

`result`の構造はこちらです。

|プロパティ|説明|必須|型|
|:-|:-|:-|:-|
|component|結果に表示するコンポーネント|はい|string(notification もしくは message)|
|message|結果に表示するメッセージ|はい|string|
|type|結果に表示する通知スタイル|はい|string(info, success, warning, danger)|
|options|オプション機能|いいえ|array|

`options`の配列に渡すオブジェクトです。

|action|parameter|
|:-|:-|
|copy|string(クリップボードにコピーする文字列)|
|setLocalStorage|array(Local Storageにセットするキー、値)|
|removeLocalStorage|array(Local Storageにセットするキー)|

入力フォームを使用した場合、`form.id`といった形式で入力した値を参照できます。
ローカルストレージに設定した値は、`ls.key`といった形式で参照できます。

### your_form.js
フォームは3つの要素で構成されています。

|プロパティ|説明|必須|型|
|:-|:-|:-|:-|
|header|ヘッダー|いいえ|object|
|fields|フィールド|はい|array|
|footer|フッター|いいえ|object|

- header

  |プロパティ|説明|必須|型|
  |:-|:-|:-|:-|
  |text|タイトル|いいえ|string|
  |class|クラス|いいえ|string|

- fields

  |プロパティ|説明|必須|型|
  |:-|:-|:-|:-|
  |type|入力形式|はい|string(text, checkbox, radio, select, textarea)|
  |id|スニペット内で参照するために使うID|はい|string|
  |class|クラス|いいえ|string|
  |label|項目の説明に使用するラベル|いいえ|string|
  |value|値|はい|string(text, checkbox, textarea) もしくは array(radio, select)|
  |disabled|操作不能|いいえ|boolean|
  |icon|[Font Awesome](http://fontawesome.io/icons/) アイコン|いいえ|object|

  - icon

    |プロパティ|説明|必須|型|
    |:-|:-|:-|:-|
    |type|アイコンの種類|はい|string(例: fa-github)|
    |class|クラス|いいえ|string(is-left もしくは is-right)|

- footer

  |プロパティ|説明|必須|型|
  |:-|:-|:-|:-|
  |submit|サブミットボタン|いいえ|object(text, class)|
  |cancel|キャンセルボタン|いいえ|object(text, class)|

  - submit

    |プロパティ|説明|必須|型|
    |:-|:-|:-|:-|
    |text|テキスト|いいえ|string(デフォルト:`OK`)|
    |class|クラス|いいえ|string(デフォルト:`is-primary`)|

  - cancel

    |プロパティ|説明|必須|型|
    |:-|:-|:-|:-|
    |text|テキスト|いいえ|string(デフォルト:`cancel`)|
    |class|クラス|いいえ|string|

### Content Scripts
`tree.js`内で`autoRun`オプションを`true`に設定すると、スニペットは`Content Scripts`として自動実行されます。

## カスタマイズ
### Bulma
`bulma.sass`を編集し、Bulmaの色や変数を簡単にカスタマイズすることができます。

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
