import { scraper } from './scraper';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(data: unknown): void;
    };
  }
}

window.ReactNativeWebView?.postMessage(JSON.stringify(scraper()));
