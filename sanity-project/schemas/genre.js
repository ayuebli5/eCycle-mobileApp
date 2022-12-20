export default {
  name: 'genre',
  title: 'Electronic Device Category',
  type: 'document',
  fields: [
    {
      name: 'genre',
      title: 'Electronic Device Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}
