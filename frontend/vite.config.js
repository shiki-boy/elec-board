import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@honkhonk/vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig( {
  build: { assetsDir: 'static' },
  css: {
    postcss: {
      plugins: [
        {
          AtRule: {
            charset: ( atRule ) => {
              if ( 'charset' === atRule.name ) {
                atRule.remove()
              }
            },
          },
          postcssPlugin: 'internal:charset-removal',
        },
      ],
    },
  },
  plugins: [ react(), svgr.default() ],
  resolve: { alias: { '@': path.resolve( __dirname, './src' ) } },
  server: {
    port: 4000,
    proxy: { '/api': 'http://localhost:8000' },
  },
} )
