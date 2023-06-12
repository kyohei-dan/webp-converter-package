# Webp Converter Package

## 説明

- 指定したディレクトリの中の jpg 形式 もしくは png 形式 ファイルをすべて webp 形式 のファイルに変換できる Node.js のプログラムパッケージです。
- jpg は非可逆圧縮、png は可逆圧縮するように設定してます。
- 圧縮には Node.js の`sharp`というライブラリを使ってます。

## インストール

using npm

```
npm i -D webp-converter-package
```

## 実装

### 画像を WebP に変換する設定を js ファイルに記述する

```js
import ImageFileConverter from "webp-converter-package";

(async () => {
  new ImageFileConverter([
    {
      dirPath: "./assets/images",
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
