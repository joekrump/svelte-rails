import { defineConfig } from 'vite'
import FullReload from 'vite-plugin-full-reload';
import RubyPlugin from 'vite-plugin-ruby'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    FullReload(['config/routes.rb', 'app/views/**/*']),
    svelte(),
    RubyPlugin(),
  ],
})
