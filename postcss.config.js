// postcss.config.js
const tailwindcss = require("tailwindcss");

const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./frontend/**/*.svelte", "./app/views/**/*.html.erb"],

  whitelistPatterns: [/svelte-/],

  // Include any special characters you're using in this regular expression

  defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    require("postcss-import"),
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    }),
    ...(process.env.NODE_ENV == "production" ? [purgecss] : []),
  ],
};
