import type { CollectionConfig } from 'payload'

export const Platforms: CollectionConfig = {
  slug: 'platforms',
  admin: {
    defaultColumns: ['name', 'manufacturer'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      unique: true,
      index: true,
    },
    {
        name: 'slug',
        type: 'text',
        label: 'Slug',
        required: true,
        unique: true,
        index: true,
    },
    {
      name: 'abbreviation',
      type: 'text',
      label: 'Abbreviation',
      index: true,
    },
    {
        name: 'alternative_names',
        type: 'text',
        label: 'Alternative Name',
        index: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      options: [
        {
          label: 'Portable',
          value: 'portable',
        },
        {
          label: 'Console',
          value: 'console',
        },
      ],
      required: true,
    },
    {
      name: 'manufacturer',
      type: 'relationship',
      label: 'Manufacturer',
      relationTo: 'manufacturers',
      hasMany: false,
      required: true,
    },
  ],
};
