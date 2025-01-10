import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        tsconfigPaths()
    ],
    test:{
        include: ['src/**/*.spec.ts']
    }
})

// export default (await import('vitest/config')).defineConfig({
//     plugins: [
//         (await import('vite-tsconfig-paths')).default()
//     ]
// })