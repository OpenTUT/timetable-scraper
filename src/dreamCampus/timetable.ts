import { z } from 'zod';
import { DreamCampusSubject } from './subject.js';

export const DreamCampusTimetable = z.object({
  belong: z.string().nullable(),
  term: z.string().nullable(),
  lecture: z.array(z.array(z.array(DreamCampusSubject))),
  others: z.array(z.array(z.array(DreamCampusSubject))),
});

export type DreamCampusTimetable = z.infer<typeof DreamCampusTimetable>;
