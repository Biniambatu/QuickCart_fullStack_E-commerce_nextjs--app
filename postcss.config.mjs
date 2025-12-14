// const config = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
// };

// export default config;
// postcss.config.mjs
// postcss.config.js or postcss.config.mjs
// postcss.config.js
export default {
  plugins: {
    // IMPORTANT: Use the new package name here!
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
  },
};