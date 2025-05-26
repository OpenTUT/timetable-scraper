import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'browser/index.ts',
  output: {
    dir: 'dist/browser',
  },
  plugins: [
    {
      name: 'export-js-as-string',
      generateBundle(_, bundle) {
        for (const file of Object.values(bundle)) {
          if (file.type === 'chunk') {
            file.code = `export default ${JSON.stringify(file.code)};`;
          }
        }
      },
    },
  ],
});
