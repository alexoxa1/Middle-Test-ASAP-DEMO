import { z } from '@hono/zod-openapi'

export const MarkSchema = z.object({
  name: z.string(),
  x: z.number(),
  y: z.number(),
  comment: z.string().optional()})