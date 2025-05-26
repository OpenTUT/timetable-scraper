import { z } from 'zod';
import { Subject } from './Subject.js';

export const Timetable = z.object({
  year: z.string(),
  belong: z.string(),
  semester: z.union([z.literal('spring'), z.literal('fall')]),
  firstHalf: z.array(z.array(z.nullable(Subject))),
  secondHalf: z.array(z.array(z.nullable(Subject))),
  intensive: z.array(z.array(z.nullable(Subject))),
});

export type Timetable = z.infer<typeof Timetable>;
