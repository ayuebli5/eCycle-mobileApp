export default {
    name: 'partners',
    title: 'Partners',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Partner Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
        validation: (Rule) => Rule.max(20),

      },
      {
        name: 'image',
        title: 'Image to be attached',
        type: 'image',
      },
      {
        name: 'points',
        title: 'Minimum Points',
        type: 'number',
      },
      {
        name: 'rewardstype',
        title: 'Reward Type',
        type: 'reference',
        validation: (Rule) => Rule.required(),
        to: [{ type: "rewardstype"}],
      },
      ],
  }
  