import { getDreamCampusTimetable } from '../src/dreamCampus/index.js';
import type { WebViewMessage } from '../src/schemas/index.js';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(data: unknown): void;
    };
  }
}

(() => {
  try {
    const data = getDreamCampusTimetable();
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'successful', data } satisfies WebViewMessage),
    );
  } catch {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'failed' } satisfies WebViewMessage),
    );
  }
})();
