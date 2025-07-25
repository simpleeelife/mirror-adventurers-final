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
        defineField({
          name: 'storyPageHeroImage',
          title: 'Story Page Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'catchphrase',
          title: 'キャッチフレーズ (Catchphrase)',
          type: 'text', // stringからtextに変更し、改行を可能に
          rows: 3,
        }),
        defineField({
          name: 'heroSubtitle',
          title: 'ヒーローセクションのサブタイトル',
          type: 'text', // こちらも改行可能なtextタイプ
          rows: 2,
        }),
        defineField({
          name: 'pastStory',
          title: '過去の物語 (Past Story)',
          type: 'object',
          fields: [
            { name: 'subtitle', title: 'キャッチフレーズ', type: 'string' },
            { name: 'content', title: '物語本文', type: 'array', of: [{type: 'block'}] }
          ]
        }),
        defineField({
          name: 'creativeLinks',
          title: '創作物ポートフォリオ (Portfolio Links)',
          type: 'array', 
          of: [{type: 'externalLink'}]
        }),
        defineField({
          name: 'assetGallery',
          title: '二次創作アセット (Asset Gallery)',
          type: 'array',
          of: [{
            type: 'image',
            options: { hotspot: true },
            fields: [
              {
                name: 'caption',
                type: 'string',
                title: 'キャプション (Caption)',
              }
            ]
          }]
        }),
        defineField({
          name: 'futureMemory',
          title: '未来の記憶 (Future Memory)',
          type: 'object',
          fields: [
            { name: 'subtitle', title: 'キャッチフレーズ', type: 'string' },
            { name: 'content', title: '物語本文', type: 'array', of: [{type: 'block'}] }
          ]
        }),
      ],
    }),
  ],
})