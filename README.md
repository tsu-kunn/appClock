# appClock
React+Electronで作る時計アプリ。\
そばにある時計（bisideClock）という iOS/iPadOS で提供されていたアプリを見本にしています。

React+Electronを学ぶことを目的としているため、\
Create React Appで作成し、Electronでアプリの皮を被せています。

## フォルダ構成
- .vscode
  - React と Electron をVSCodeでデバッグするためのファイル
- build
  - `npm run build` で作られた公開用ファイル
- public
  - index.html など基本的なファイルが入っているところ
- src
  - React + Electron本体および、これらで使われるファイルが入っているところ

## 補足
- `npm start` してもブラウザが自動起動しない
  - ".env" ファイルで起動しないように設定しているため（VSCodeデバッグ向け）
- build フォルダをリポジトリ管理
  - ".gitignore" で build 部分をコメントアウト
