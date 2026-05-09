import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),

  title: z.string(),

  price: z.number(),

  description: z.string(),

  category: z.string(),

  image: z.string()
});