export default {
  name: 'electronics',
  title: 'Electronics',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Electronic Device Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image of Device',
      type: 'image',
    },
    {
      name: 'genre',
      title: 'Device Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: "genre"}],
    },
    {
      name: 'estimatedPoint',
      title: 'Estimated Point',
      type: 'number',
    },
  ],
}
