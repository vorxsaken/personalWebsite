/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
      'pacifico': ['Pacifico'],
      'alfa': ['Alfa Slab One']
    },
    extend: {
      backgroundImage: {
        'grid': "url(/src/assets/img/grid.png)"
      }
    },
  },
  "tailwindCSS.trace.server": "verbose",
  "tailwindCSS.emmetCompletions": true,
  "tailwindCSS.cssLanguages": [ "css", "less", "postcss", "sass", "scss", "stylus", "vue", "jsx" ],
  "tailwindCSS.jsLanguages": [ "javascript", "javascriptreact", "reason", "typescriptreact" ],
  
}
