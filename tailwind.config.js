/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'default': [`Raleway`, `system-ui`, `sans-serif`]
      }
    }
  },
  plugins: []
};