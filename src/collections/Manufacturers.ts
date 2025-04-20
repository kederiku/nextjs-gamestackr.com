import { CollectionConfig } from 'payload';

export const Manufacturers: CollectionConfig = {
  slug: 'manufacturers',
  admin: {
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
      name: "color",
      type: "text",
    },
    {
      name: "platforms",
      type: "join",
      collection: "platforms",
      on: "manufacturer",
      hasMany: true,
      defaultLimit: 50,
    },
  ],
};