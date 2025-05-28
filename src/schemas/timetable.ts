import { z } from 'zod';
import { Subject } from './subject.js';

export const Timetable = z.strictObject({
  year: z.string(),
  belong: z.string(),
  semester: z.enum(['spring', 'fall']),
  firstHalf: Subject.nullable().array().array(),
  secondHalf: Subject.nullable().array().array(),
  intensive: Subject.nullable().array().array(),
});

export type Timetable = z.infer<typeof Timetable>;
