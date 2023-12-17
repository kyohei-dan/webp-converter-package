# Webp Converter Package

## 説明

- 指定したディレクトリの中の jpg 形式 もしくは png 形式 ファイルをすべて webp 形式 のファイルに変換できる Node.js のプログラムパッケージです。
- jpg は非可逆圧縮、png は可逆圧縮するように設定してます。
- 圧縮には Node.js の`sharp`というライブラリを使ってます。

## URL

<a href="https://www.npmjs.com/package/@kyohei-dan/webp-converter-package" target="_blank"><strong>https://www.npmjs.com/package/@kyohei-dan/webp-converter-package</strong></a>

## インストール

using npm

```
npm i -D @kyohei-dan/webp-converter-package
```

## 実装

### package.json ファイルにコマンドを記述する

```js
"scripts": {
  "webp": "node webp.js",
},
```

### package.json ファイルと同じ階層に webp.js ファイルを新規で作成する

### 画像を WebP に変換する設定を webp.js ファイルに記述する

```js
const ImageFileConverter = require("@kyohei-dan/webp-converter-package");

(async () => {
  new ImageFileConverter([
    {
      dirPath: "../assets/images",
      format: [".jpg", ".jpeg", ".png"],
      quality: 80,
    },
  ]);
})();
```

### プログラムを実行する

```
npm run webp
```

設定
| config | Default | Required | Value Type
|---|---|---|--|
| dirPath | none | true | 文字列 |
| format | ".jpg", ".jpeg", ".png" | false | 配列 |
| quality | 80 | false | 数値 |
