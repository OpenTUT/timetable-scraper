import { z } from 'zod';
import { DreamCampusSubject } from './dreamCampusSubject.js';

export const DreamCampusTimetable = z.strictObject({
  belong: z.string().nullable(),
  term: z.string().nullable(),
  lecture: z.array(z.array(z.array(DreamCampusSubject)).length(6)).length(6),
  others: z.array(z.array(z.array(DreamCampusSubject)).length(6)).length(3),
});

export type DreamCampusTimetable = z.infer<typeof DreamCampusTimetable>;
