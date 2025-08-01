### 1. デザインコンセプト

本サイトは、「宇宙の源への旅」をテーマとした、ミニマルで洗練されたサイバーパンクの世界観を表現する。黒を基調とした静謐な宇宙空間に、キャラクターの内面から放たれる光（ネオン）がアクセントとなる。ユーザーがサイトを訪れることで、日常から切り離された思索的な空間へと没入し、キャラクターの魂の物語に深く触れる体験を目指す。

### 2. カラーパレット

色彩は限定的に使用し、統一感と没入感を重視する。

|役割|カラーコード|用途|
|---|---|---|
|**プライマリ（背景）**|`#0a0a0f`|サイト全体の背景色。|
|**セカンダリ（UI背景）**|`#1a1a2e`|情報パネルや検索窓など、UI要素の背景。|
|**アクセント（メイン）**|`#00ffff`|テキスト、アイコン、枠線、ボタンなど、最も重要なインタラクション要素。|
|**アクセント（サブ）**|`#ff00ff`|タイトルのグラデーションや、一部の強調したいエフェクト。|
|**テキスト（基本）**|`#e0e0e0`|通常の本文テキスト。|
|**テキスト（サブ）**|`#888888`|補足情報など、重要度の低いテキスト。|

### 3. タイポグラフィ

フォントは、世界観を表現する上で最も重要な要素の一つと位置づける。

|要素|フォントファミリー|スタイル|用途|
|---|---|---|---|
|**サイトタイトル**|`Orbitron`|`font-bold`|ヘッダーのサイトタイトル、特設ページのキャッチフレーズなど。|
|**見出し**|`Orbitron`, `Teko`|`font-bold`|各セクションの見出し。|
|**サブタイトル**|`DotGothic16`|`font-normal`|「冒険者の酒場」など、アクセントとして使用。|
|**本文**|`Teko`|`font-normal`|キャラクターの説明文など、基本的なテキスト。|

### 4. コンポーネントデザイン

サイトを構成する各UIパーツのデザインを定義する。

**4.1. ヘッダー**

- 背景: `rgba(10, 10, 15, 0.8)` に `backdrop-filter: blur(10px)` を適用。
    
- 下線: `#00ffff80` の1px線。
    
- タイトル: 紫から水色へのグラデーションテキスト。`drop-shadow(0 0 5px #00ffff)` を適用。
    
- 検索窓:
    
    - 背景: `#1a1a2e`
        
    - 枠線: `1px solid #00ffff80`
        
    - フォーカス時: `border-color: #00ffff`, `box-shadow: 0 0 10px #00ffff`
        

**4.2. キャラクターカード（一覧）**

- 背景: `transparent`
    
- アイコン枠:
    
    - `border: 2px solid #00ffff`
        
    - `box-shadow: 0 0 10px rgba(0, 255, 255, 0.3)`
        
- ホバー時:
    
    - カード全体: `transform: translateY(-5px)`
        
    - アイコン枠: `box-shadow: 0 0 20px rgba(0, 255, 255, 0.6)`
        

**4.3. 情報パネル（詳細ページ）**

- 背景: `rgba(10, 10, 15, 0.5)`
    
- 枠線: `1px solid rgba(0, 255, 255, 0.3)`
    
- 角丸: `8px`
    

**4.4. ステータスバー**

- 背景: `#1a1a2e`
    
- ゲージ: `#00ffff` の単色。`box-shadow: 0 0 8px #00ffff` を適用。
    
- アニメーション: 画面に表示されたタイミングで、0%から指定値まで1秒かけて伸びる。
    

### 5. アニメーションとインタラクション

**5.1. 背景アニメーション**

- **トップページ（一覧）**: 宇宙の中心にある「源」から星々が生まれ、こちらへ向かって流れてくるような、奥行きのあるアニメーション。
    
- **キャラクターページ / ヒーローセクション**: 静かで荘厳な宇宙空間に漂う、サイバーパンク的な光の靄（もや）がゆっくりと揺らめくアニメーション。
    

**5.2. ヒーローセクション**

- 5秒ごとにキャラクターが自動で切り替わる。
    
- 切り替えアニメーション: 前のキャラクターがフェードアウトしながら右へ移動し、次のキャラクターが右からフェードインしてくる。
    

**5.3. ページ遷移**

- トップページからキャラクターページへは、画面全体が切り替わる。
    
- キャラクターページ間の移動（矢印クリック）は、コンテンツのみがその場で更新される。
    

### 6. レスポンシブデザイン

画面幅に応じてレイアウトを最適化する。ブレークポイントはTailwind CSSのデフォルト（`sm: 640px`, `md: 768px`, `lg: 1024px`）に従う。

| 要素            | スマートフォン（~639px）    | PC（640px~）         |
| ------------- | ------------------ | ------------------ |
| **ヘッダータイトル**  | 「鏡の中の冒険者」          | 「鏡の中の冒険者」          |
| **ヒーローセクション** | 画像とテキストが上下に並ぶ      | 画像とテキストが左右に並ぶ      |
| **キャラクター一覧**  | 3列グリッド             | 6列グリッド             |
| **キャラクター詳細**  | 1列レイアウト            | 2列レイアウト（ステータス/得意技） |
| **アーキタイプ説明**  | 「？」アイコンをタップでモーダル表示 | 常時表示               |