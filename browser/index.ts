import { scraper } from '../src/scraper.js';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(data: unknown): void;
    };
  }
}

window.ReactNativeWebView?.postMessage(
  JSON.stringify({ type: 'timetable', data: scraper() }),
);
