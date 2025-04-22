import type { CollectionConfig } from "payload";

export const Games: CollectionConfig = {
  slug: "games",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "year",
      type: "number",
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
    },
    {
      name: "genres",
      type: "relationship",
      relationTo: "genres",
      hasMany: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media"
    }
  ]
}