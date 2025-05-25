import { z } from 'zod';

export const WebViewMessage = z.object({
  type: z.string(),
  data: z.unknown().optional(),
});

export type WebViewMessage = z.infer<typeof WebViewMessage>;
