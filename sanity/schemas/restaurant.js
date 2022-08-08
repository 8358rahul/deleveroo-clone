export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: "short_description",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name:"image",
      title:"Image of the Restaurant",
      type:"image", 
    },
    {
      name:'lat',
      title: 'Latitude',
      type: 'number',
    },
    {
      name:'long',
      title: 'Longitude',
      type: 'number',
    },
    {
      name:'address',
      title: 'Address',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name:'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    },
    {
      name:'type',
      title: 'Category',
      validation: Rule => Rule.required(),
      type: 'reference',
      to: [{ type: 'category' }],

    },
    {
      name:'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },

   

  ],
 
}
