import { z } from 'zod';

export const WebViewMessage = z.strictObject({
  type: z.enum(['loading', 'successful', 'failed']),
  data: z.unknown(),
});

export type WebViewMessage = z.infer<typeof WebViewMessage>;
