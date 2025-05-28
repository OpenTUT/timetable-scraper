import { z } from 'zod';

export const WebViewMessage = z.strictObject({
  type: z.string(),
  data: z.unknown(),
});

export type WebViewMessage = z.infer<typeof WebViewMessage>;
