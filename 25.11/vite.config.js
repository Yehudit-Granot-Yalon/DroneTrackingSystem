
import { defineConfig } from "vite";

// export default {
//   build: {
//     sourcemap: true,
//   }
// }
export default defineConfig({
  build: {
    rollupOptions: {
      sourcemap: true,
      external: ["fs/promises"],
    },
  },
});
hmr: { overlay: false }