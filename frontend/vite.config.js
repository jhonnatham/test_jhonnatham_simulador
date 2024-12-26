import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
    watch: {
       usePolling: true,
    },
    secure: false,
  },
  define: {
    'process.env': process.env
  },
})
