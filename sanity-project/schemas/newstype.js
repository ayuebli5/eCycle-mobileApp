export default {
  name: 'newstype',
  title: 'News Type',
  type: 'document',
  fields: [
    {
      name: 'newstype',
      title: 'News type',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short description of News type',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image of Category',
      type: 'image',
    },
  ],
}
