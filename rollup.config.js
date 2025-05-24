import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/browser/index.ts',
  output: {
    dir: 'dist/browser',
  },
  plugins: [
    typescript({ tsconfig: 'tsconfig.browser.json' }),
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
