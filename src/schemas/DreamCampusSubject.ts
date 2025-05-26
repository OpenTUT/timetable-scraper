import { z } from 'zod';

export const DreamCampusSubject = z.object({
  lctCd: z.string().nullable(),
  reqName: z.string().nullable(),
  credit: z.string().nullable(),
  termName: z.string().nullable(),
  sbjDivName: z.string().nullable(),
  sbjName: z.string().nullable(),
  url: z.string().nullable(),
  cancelName: z.string().nullable(),
  staffName: z.string().nullable(),
  adjustName: z.string().nullable(),
  lotResultName: z.string().nullable(),
});

export type DreamCampusSubject = z.infer<typeof DreamCampusSubject>;
