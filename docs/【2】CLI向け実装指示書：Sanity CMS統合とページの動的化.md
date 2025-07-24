
## 1. 目的と前提

- **目的**: 既存のNext.jsプロジェクトにSanity CMSを統合し、現在ハードコードされている全ページのデータを、Sanityから取得する動的データに置き換える。
    
- **参照仕様書**: 「『鏡の中の冒険者たち』制作仕様書_20250722.md」のデータ構造定義に正確に従うこと。
    
- **現在の状況**: 「【1】「完全な骨格」構築・開発手順書.md」に基づき、Next.jsの静的な骨格が完成している。
    

---

## 2. Sanityプロジェクトのセットアップ

### Step 2.1: 必要なパッケージのインストール

`package.json` の `dependencies` に、Sanity関連のパッケージを追加してください。

JSON

```
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "sanity": "^3.0.0",
    "next-sanity": "^7.0.0",
    "@sanity/vision": "^3.0.0",
    "@sanity/image-url": "^1.0.2",
    "styled-components": "^6.0.0",
    "framer-motion": "^10.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

### Step 2.2: Sanity設定ファイルの作成

プロジェクトルートに `sanity.config.ts` と `sanity.cli.ts` を作成します。

**`sanity.config.ts`**

TypeScript

```
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'

// 環境変数からプロジェクトIDとデータセットを読み込む
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio', // Sanity StudioのURL
  name: 'mirror_adventurers_content_studio',
  title: 'Mirror Adventurers Content Studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

**`sanity.cli.ts`**

TypeScript

```
import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  }
})
```

### Step 2.3: Sanity Studio用のページを作成

Next.jsのApp Router内でSanity Studioをホストするため、`app/studio/[[...index]]/page.tsx` を作成してください。

TypeScript

```
// app/studio/[[...index]]/page.tsx
'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

---

## 3. スキーマ定義

「制作仕様書」に基づき、`sanity/schemaTypes/` ディレクトリ内にスキーマファイルを作成します。

### Step 3.1: `character.ts` の作成

TypeScript

```
// sanity/schemaTypes/character.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'character',
  title: 'Character',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'characterId',
      title: 'Character ID',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'isPickup',
      title: 'Is Pickup Character?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'class',
      title: 'Class',
      type: 'string',
    }),
    defineField({
      name: 'iconImage',
      title: 'Icon Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'archetype',
      title: 'Archetype',
      type: 'object',
      fields: [
        {name: 'name', type: 'string', title: 'Archetype Name'},
        {name: 'description', type: 'array', title: 'Description', of: [{type: 'block'}]},
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        {name: 'hp', type: 'number', title: 'HP (0-100)'},
        {name: 'attack', type: 'number', title: 'Attack (0-100)'},
        {name: 'magic', type: 'number', title: 'Magic (0-100)'},
        {name: 'defense', type: 'number', title: 'Defense (0-100)'},
        {name: 'speed', type: 'number', title: 'Speed (0-100)'},
        {name: 'strategy', type: 'number', title: 'Strategy (0-100)'},
      ]
    }),
    defineField({
      name: 'skill',
      title: 'Skill',
      type: 'object',
      fields: [
        {name: 'name', type: 'string', title: 'Skill Name'},
        {name: 'description', type: 'array', title: 'Description', of: [{type: 'block'}]},
      ],
    }),
    defineField({
      name: 'personality',
      title: 'Personality',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'backgroundStory',
      title: 'Background Story',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'evolutionPath',
      title: 'Evolution Path',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'specialPage',
      title: 'Special Page Details',
      type: 'object',
      fields: [
        {name: 'catchphrase', type: 'string', title: 'Catchphrase'},
        {name: 'story', type: 'array', title: 'Story', of: [{type: 'block'}]},
        {name: 'creativeLinks', type: 'array', title: 'Creative Links', of: [{type: 'externalLink'}]},
      ],
    }),
  ],
})
```

### Step 3.2: `externalLink.ts` の作成

TypeScript

```
// sanity/schemaTypes/externalLink.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Twitter', value: 'twitter'},
          {title: 'Pixiv', value: 'pixiv'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
  ],
})
```

### Step 3.3: スキーマのインデックスファイル作成

`sanity/schemaTypes/index.ts` を作成し、すべてのスキーマをエクスポートします。

TypeScript

```
// sanity/schemaTypes/index.ts
import character from './character'
import externalLink from './externalLink'

export const schemaTypes = [character, externalLink]
```

---

## 4. Next.jsとSanityの連携設定

### Step 4.1: 環境変数の準備

プロジェクトルートに `.env.local.template` を作成します。これをコピーして `.env.local` を作成し、実際の値を設定するように促してください。

コード スニペット

```
# .env.local.template
# Sanity.io の Manage プロジェクトからコピーしてください
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="" # 読み取り権限を持つトークン
```

### Step 4.2: Sanityクライアントの作成

`lib/sanity.client.ts` を作成し、Sanityからデータを取得するためのクライアントを設定します。

TypeScript

```
// lib/sanity.client.ts
import {createClient} from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2023-05-03'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 開発中はfalseを推奨
})
```

---

## 5. ページの動的化

各ページのハードコードされたデータを、Sanityからのデータに置き換えます。

### Step 5.1: `app/tavern/page.tsx` の修正

キャラクター一覧を動的に取得・表示します。

TypeScript

```
// app/tavern/page.tsx
import { client } from '../../lib/sanity.client';
import { Orb } from '../components/Orb';
import { SectionTitle } from '../components/SectionTitle';
import Link from 'next/link';
import { groq } from 'next-sanity';

// GROQクエリを定義
const query = groq`*[_type == "character"]{
  _id,
  name,
  characterId,
  "iconUrl": iconImage.asset->url
}`;

interface Character {
  _id: string;
  name: string;
  characterId: { current: string };
  iconUrl?: string;
}

export default async function TavernPage() {
  const characters: Character[] = await client.fetch(query);

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <Link href="/">
            <h1 className="font-orbitron text-4xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent cursor-pointer">
              冒険者の酒場
            </h1>
          </Link>
        </div>
        
        <div className="text-center mb-12">
            <SectionTitle>Characters</SectionTitle>
        </div>

        {/* キャラクター一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {characters.map((char) => (
            <Link href={`/characters/${char.characterId.current}`} key={char._id} className="text-center group flex flex-col items-center">
              <Orb size="medium" image={char.iconUrl} character={!char.iconUrl ? char.name.charAt(0) : undefined} />
              <h4 className="mt-4 font-orbitron text-xl text-white group-hover:text-accent-main transition-colors">
                {char.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

### Step 5.2: `app/characters/[characterId]/page.tsx` の修正

キャラクター詳細情報を動的に取得・表示します。

TypeScript

```
// app/characters/[characterId]/page.tsx
import { client } from '../../../lib/sanity.client';
import { Orb } from '../../../components/Orb';
import { StatusBar } from '../../../components/StatusBar';
import { InfoPanel } from '../../../components/InfoPanel';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';

const query = groq`*[_type == "character" && characterId.current == $characterId][0]{
  name,
  characterId,
  class,
  "heroImageUrl": heroImage.asset->url,
  archetype,
  stats,
  skill,
  personality,
  backgroundStory,
  specialPage
}`;

// ... (ここにSanityから取得するCharacterの型定義を追加)

export default async function CharacterPage({ params }: { params: { characterId: string } }) {
  const character = await client.fetch(query, { characterId: params.characterId });

  if (!character) {
    return <div>キャラクターが見つかりません。</div>;
  }

  return (
    <main className="min-h-screen px-4 py-16 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* 左カラム: キャラクタービジュアル */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <Link href="/tavern" className="text-accent-main hover:brightness-125 self-start font-dotgothic">&larr; 酒場に戻る</Link>
            <Orb size="large" image={character.heroImageUrl} />
            <div className="text-center">
              <h1 className="font-orbitron text-5xl font-bold text-accent-main tracking-widest">{character.name}</h1>
              <p className="font-dotgothic text-xl text-text-sub mt-2">{character.class}</p>
            </div>
          </div>

          {/* 右カラム: 詳細情報 */}
          <div className="space-y-8">
            <InfoPanel title="アーキタイプ">
              <h4 className="font-teko text-2xl text-white font-bold">{character.archetype.name}</h4>
              <PortableText value={character.archetype.description} />
            </InfoPanel>

            <InfoPanel title="ステータス">
              <StatusBar label="体力" value={character.stats.hp} />
              <StatusBar label="攻撃" value={character.stats.attack} />
              <StatusBar label="魔法" value={character.stats.magic} />
              <StatusBar label="防御" value={character.stats.defense} />
              <StatusBar label="速度" value={character.stats.speed} />
              <StatusBar label="戦略" value={character.stats.strategy} />
            </InfoPanel>

            <InfoPanel title="得意技">
              <h4 className="font-teko text-2xl text-white font-bold">{character.skill.name}</h4>
              <PortableText value={character.skill.description} />
            </InfoPanel>
            
            {character.specialPage && (
              <div className="text-center pt-4">
                <Link href={`/characters/${params.characterId}/story`} className="inline-block px-10 py-4 bg-accent-main text-primary-bg rounded-full font-orbitron font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-main/30 transition-all duration-300">
                  もっと詳しく知る
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
```