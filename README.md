# Svelte + Rails

This is a template of an app with a setup that allows Svelte components to be used in combination with ERB templates to render views.

This also includes:

- Hot module replacement for `.svelte` files
- Hot reloading for changes to `routes.rb` and Rails view files. See [`vite.config.ts`](https://github.com/joekrump/svelte-rails/blob/b62219c0e71d614b8d5f7c398e47e3efb47244e6/vite.config.ts) for details.
- A Rails helper to allow for easy addition of `.svelte` components into `.html.erb` templates using `<svelte-*>` syntax. See [`app/frontend/svelte/index.ts`](https://github.com/joekrump/svelte-rails/blob/c08b917c80eacffe38b668bdb156160ffe7718a6/app/frontend/svelte/index.ts) for details.
- [TailwindCSS for styling](https://tailwindcss.com)

## Dev

You will find Svelte components in `app/frontend/svelte/`. To add them to a Rails view (`.html.erb` file), see details in [`app/frontend/svelte/index.ts`](https://github.com/joekrump/svelte-rails/blob/c08b917c80eacffe38b668bdb156160ffe7718a6/app/frontend/svelte/index.ts).

Example:

See `app/views/home/index.html.erb`:

```erb
<svelte-home data-props="<%= @data.to_json %>"></svelte-home>
```
### Setup

```bash
bundle install
yarn
```

### Run app:
```bash
bundle exec rails s
bin/vite dev
```
