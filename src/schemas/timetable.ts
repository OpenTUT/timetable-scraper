import { z } from 'zod';
import { Subject } from './subject.js';

export const Timetable = z.strictObject({
  belong: z.string(),
  year: z.string(),
  term: z.enum(['spring', 'fall']),
  firstHalf: z.array(z.array(Subject.nullable())),
  secondHalf: z.array(z.array(Subject.nullable())),
  intensive: z.array(z.array(Subject.nullable())),
});

export type Timetable = z.infer<typeof Timetable>;
