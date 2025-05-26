declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(data: unknown): void;
    };
  }
}
export {};
//# sourceMappingURL=index.d.ts.map
