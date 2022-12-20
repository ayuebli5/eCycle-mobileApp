export default {
    name: 'updates',
    title: 'Updates',
    type: 'document',
    fields: [
      {
        name: 'headline',
        title: 'News Headline',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'image',
        title: 'Image to be attached',
        type: 'image',
      },
      {
        name: 'type',
        title: 'Type of Activity',
        type: 'string',
      },
      {
        name: 'date',
        title: 'Date added',
        type: 'string',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Content',
        type: 'string',
      },
      {
        name: 'newstype',
        title: 'News Type',
        type: 'reference',
        validation: (Rule) => Rule.required(),
        to: [{ type: "newstype"}],
      },
      ],
  }
  