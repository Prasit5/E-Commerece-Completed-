import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Add this line to specify the base URL
  plugins: [react()],
})
