# anan-hosp Gutenberg Custom Block Boilerplate

## 概要
このディレクトリは、Gutenberg カスタムブロック（例: Hello World ブロック）の開発用ボイラープレートです。

## セットアップ

1. 依存パッケージのインストール

```
npm install
```

2. ブロックのビルド

```
npm run build
```

3. 開発モード

```
npm run start
```

## ブロックの追加方法
- `src/hello-world/` ディレクトリを参考に新しいブロックを追加してください。
- `block.json` でブロックのメタ情報を管理します。
- ブロックのソースは TypeScript（.ts）と SCSS（.scss）で記述します。

## WordPress への組み込み
- `anan-custom-blocks.php` を WordPress プラグインとして有効化してください。
- ブロックは `build/hello-world` ディレクトリから自動的に登録されます。 