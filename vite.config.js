import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
server: {
    proxy: {
      "/accounts": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        ws: false
      },
      "/auth": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        ws: false
      },
      // ajoute d’autres routes si nécessaire
    }
  }
  
})
