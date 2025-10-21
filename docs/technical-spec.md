# 技術仕様書（Mirror Adventurers）

## 1. システム概要
- **目的**: 『Adventurers in the Mirror』世界観を紹介し、Sanity CMSで管理するキャラクターデータを Next.js で配信するウェブ体験を提供する。
- **構成要素**:
  - Next.js 14 App Router ベースのフロントエンド
  - Sanity v3 を用いた Headless CMS
  - Tailwind CSS / カスタムコンポーネントによる UI
  - Next Studio による CMS 管理画面の埋め込み

## 2. 技術スタック
| レイヤ | 技術 | 用途 |
| --- | --- | --- |
| フロントエンド | Next.js 14 (App Router) | ルーティング、SSR/SSG、データ取得 |
| UI | React 18, Tailwind CSS 3, styled-components（未使用予定） | コンポーネント構築、スタイリング |
| アニメーション | Framer Motion（導入のみ） | アニメーション拡張余地 |
| CMS | Sanity 3, next-sanity 7, @portabletext/react | コンテンツ管理、GROQ クエリ、Portable Text表示 |
| データ取得 | GROQ, next-sanity client | サーバーコンポーネント内のデータフェッチ |
| 画像変換 | @sanity/image-url | 将来的な画像最適化に対応 |
| CMS管理画面 | Next Studio (`app/studio/[[...index]]`) | Sanity Studio の Next.js 組み込み |

## 3. ランタイム構成
- **Node.js バージョン**: package.json から推奨 Node 18 以降
- **主要スクリプト**: `npm run dev`, `build`, `start`, `lint`
- **ビルド出力**: `.next/`
- **環境変数**（必須）:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
- **Sanity Client 設定**: `lib/sanity.client.ts`
  - `useCdn: false`（ライブ更新重視）
  - `apiVersion: '2023-05-03'`

## 4. ディレクトリ構造（抜粋）
```
app/
  layout.tsx        … ルートレイアウト、ヘッダー、フッター、フォント
  page.tsx          … トップページ（Hero/About/Story/Featured/Connect）
  components/       … UIコンポーネント群
  characters/[characterId]/page.tsx      … 個別キャラクター
  characters/[characterId]/story/page.tsx … 特設ストーリー
  portal/page.tsx   … キャラクター一覧＋カルーセル
  studio/[[...index]]/page.tsx … Next Studio 埋め込み
lib/sanity.client.ts … GROQ用クライアント
sanity/schemaTypes/  … Sanity スキーマ定義
```

## 5. ルーティングとページ責務
- `/` トップページ: LP 構成、ピックアップキャラクターを Sanity から取得
- `/portal`: 最新5件のピックアップカルーセル＋全キャラクターのグリッド一覧
- `/characters/[characterId]`: 詳細レイアウト、前後キャラクター ナビゲーション
- `/characters/[characterId]/story`: 特別ストーリーページ（specialPage フィールド）
- `/studio/*`: Sanity Studio 管理画面

## 6. データフロー
1. サーバーコンポーネントから `client.fetch(groqQuery)` を実行
2. Sanity から `character` ドキュメントを取得
3. ページ／コンポーネントで型に沿って描画
4. Portable Text コンテンツは `@portabletext/react` でレンダリング

### 主要GROQクエリ
- トップページ: ピックアップキャラ (`isPickup == true`)
- Portal: 最新5件 & 全件一覧
- キャラ詳細: `characterId.current == $characterId`
- 全スラッグ: 隣接キャラクター算出用
- ストーリーページ: `character.specialPage`

## 7. データモデル（Sanity）
`character` ドキュメント:
- 基本情報: `name`, `characterId (slug)`, `class`, `isPickup`
- 画像: `iconImage`, `heroImage`, `specialPage.storyPageHeroImage`
- メタ: `archetype { name, description[] }`
- ステータス: `stats { hp, attack, magic, defense, speed, strategy }`
- スキル: `skill { name, description[] }`
- テキスト: `personality[]`, `backgroundStory[]`, `evolutionPath[]`
- 特設: `specialPage { catchphrase, heroSubtitle, pastStory, creativeLinks[], assetGallery[], futureMemory }`

補助スキーマ `externalLink`:
- `title`, `url`, `platform`

## 8. UI コンポーネント概要
- `Header`: 固定ヘッダー、ハンバーガーメニュー
- `HeroSection` / `AboutSection` / `StorySection` / `ConnectSection`: LP セクション
- `PickupCarousel`: クライアントサイドカルーセル（`useState`）
- `CharacterDetailLayout`: 詳細レイアウト一式（Orb、InfoPanel、StatusBar、PortableText）
- `Orb`: キャラクター画像／頭文字の丸型バッジ
- `StatusBar`: 数値ステータスをゲージ表示
- `InfoPanel`: フレーム付きセクションラッパー

## 9. スタイリング
- Tailwind CSS をベースにテーマカラー・フォントを `tailwind.config.ts` で定義
- `globals.css` で星空背景 (`.star-field`)、共通 body スタイル
- next/font を用いて Google Fonts を変数化、コンポーネントで利用

## 10. SEO / メタデータ
- `layout.tsx` で `metadata` を設定（タイトル・説明）
- OGP やソーシャル向けメタは未実装（拡張余地）
- ローカライゼーション: `lang="ja"`

## 11. 依存関係の注意点
- `styled-components`, `framer-motion` は現状未使用。将来的に不要であれば削除検討
- `@sanity/image-url` は未使用だが、画像最適化実装時に利用可能
- `useCdn: false` のため、Sanity 側のレスポンスに直接依存（パフォーマンス要件に応じて検討）

## 12. ビルド／デプロイ手順
1. 必須環境変数を `.env.local` に設定
2. `npm install`
3. 開発: `npm run dev`
4. 本番ビルド: `npm run build`
5. 実行: `npm run start`

## 13. 今後の拡張ポイント
- 検索ボックス（Portal）の実装
- 追加の OGP / SEO メタタグ設定
- Sanity スキーマのバリデーションや参照整備
- 画像の遅延読み込み・最適化
- 多言語対応
