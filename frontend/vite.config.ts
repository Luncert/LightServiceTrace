import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from "@suid/vite-plugin";
// import devtools from 'solid-devtools/vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    suidPlugin(),
    solidPlugin(),
    monacoEditorPlugin({}),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  }
});
