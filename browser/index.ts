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
    if (
      location.href ===
      'https://kyomu.office.tut.ac.jp/portal/StudentApp/Top.aspx'
    ) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: 'loading' } satisfies WebViewMessage),
      );
      (
        document.querySelector<HTMLAnchorElement>(
          '#ctl00_bhHeader_ctl350_lnk',
        ) ??
        document.querySelector<HTMLAnchorElement>('#ctl00_bhHeader_ctl33_lnk')
      )?.click();
    }

    if (
      location.href ===
      'https://kyomu.office.tut.ac.jp/portal/StudentApp/Blank.aspx#regist_results'
    ) {
      document
        .querySelector<HTMLAnchorElement>('#ctl00_bhHeader_ctl47_lnk')
        ?.click();
    }

    if (
      location.href ===
      'https://kyomu.office.tut.ac.jp/portal/StudentApp/Regist/RegistList.aspx'
    ) {
      const data = getDreamCampusTimetable();
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: 'successful', data } satisfies WebViewMessage),
      );
    }
  } catch {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'failed' } satisfies WebViewMessage),
    );
  }
})();
