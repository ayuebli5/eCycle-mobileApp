export default {
  name: 'rewardstype',
  title: 'Rewards Type',
  type: 'document',
  fields: [
    {
      name: 'rewardstype',
      title: 'Rewards type',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short description of Reward type',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image of Category',
      type: 'image',
    },
  ],
}
