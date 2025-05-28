import { z } from 'zod';

export const Subject = z.strictObject({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  area: z.string().nullable(),
  required: z.string().nullable(),
  term: z.string().nullable(),
  units: z.string().nullable(),
  grade: z.string().nullable(),
  staff: z.string().nullable(),
  room: z.string().nullable(),
});

export type Subject = z.infer<typeof Subject>;
