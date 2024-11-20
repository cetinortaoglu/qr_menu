/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "hm": {
          "darker": "#0b0f22", 
          "Dark-active": "#0e142b", 
          "Dark-hover": "#131a3a", 
          "Dark": "#182148", 
          "Normal-active": "#1a234d", 
          "Normal-hover": "#1d2856", 
          "Normal": "#202c60", 
          "Light-active": "#babece", 
          "Light-hover": "#dedfe7", 
          "Light": "#e9eaef", 
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
