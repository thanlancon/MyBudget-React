import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { env } from 'process'

// https://vitejs.dev/config/
export default defineConfig(({command, mode }) => {
  const env = loadEnv(mode,process.cwd(),'');
  return {
    base:env.VITE_BASE_URL,
    server: {
      port: 2000
    },
    plugins: [react()],
  }
})
