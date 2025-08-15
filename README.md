# 国公立大学偏差値マップ

このプロジェクトは、[ベネッセサイト](https://manabi.benesse.ne.jp/daigaku/hensachi/)で提供されている偏差値一覧を使用し、MapLibre GL JS + React を用いて Web 上に国公立大学偏差値の分布を表示したビューアです。

## 機能

- [国土数値情報（行政区域）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-2025.html)を背景に使用
- [国公立大学偏差値一覧](https://manabi.benesse.ne.jp/daigaku/hensachi/kokkoritsudai_index.html)を参考に、大学偏差値に応じて色分けして表示
- 偏差値の高さを柱状にした視覚表現のOn/Off

## 🔧 セットアップ手順

### 1. 依存ライブラリのインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

---

## 🧪 デモで使用している主なライブラリ

| ライブラリ                                                     | 概要                    |
| --------------------------------------------------------- | --------------------- |
| [maplibre-gl](https://maplibre.org/)                      | 軽量オープンソース地図描画ライブラリ    |
| [pmtiles](https://github.com/protomaps/PMTiles) | PMTiles 形式の読み込み用プロトコル |
| [React](https://react.dev/)                               | UIフレームワーク             |
| [Vite](https://vitejs.dev/)                               | 超高速フロントエンド開発環境        |
| [TypeScript](https://www.typescriptlang.org/)             | 型安全なJavaScript        |

## ライセンス
MIT