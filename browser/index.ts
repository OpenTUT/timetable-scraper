import { getDreamCampusTimetable } from '../src/dreamCampus';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(data: unknown): void;
    };
  }
}

window.ReactNativeWebView?.postMessage(
  JSON.stringify({ type: 'timetable', data: getDreamCampusTimetable() }),
);
