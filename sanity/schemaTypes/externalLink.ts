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