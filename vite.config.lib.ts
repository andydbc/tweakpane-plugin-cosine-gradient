// import { defineConfig } from 'vite';
// import { resolve } from 'path';

// export default defineConfig({
//     build: {
//         lib: {
//             entry: 'src/plugin.ts',
//             name: 'tweakpane-plugin-cosine-gradient',
//             fileName: (format) => `tweakpane-plugin-cosine-gradient.${format}.js`,
//         },
//         rollupOptions: {
//             external: ['@tweakpane/core'],
//             output: {
//                 globals: {
//                     '@tweakpane/core': 'TweakpaneCore',
//                 },
//             },
//         },
//     },
// });