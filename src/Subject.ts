import { z } from 'zod';

export const Subject = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  required: z.nullable(z.string()),
  term: z.nullable(z.string()),
  units: z.nullable(z.string()),
  staff: z.nullable(z.string()),
});

export type Subject = z.infer<typeof Subject>;
