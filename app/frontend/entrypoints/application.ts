// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application.jsx' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

// console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import '@rails/ujs'
//
// import Turbolinks from 'turbolinks'
// import ActiveStorage from '@rails/activestorage'
//
// // Import all channels.
// import.meta.globEager('./**/*_channel.js')
//
// Turbolinks.start()
// ActiveStorage.start()

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

// Svelte
import "~/svelte";

// Catalyst Web Components
import "~/components";

// Your custom CSS here
import "~/styles/application.pcss"

