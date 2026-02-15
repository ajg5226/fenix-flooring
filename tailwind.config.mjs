import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[600]'),
            '--tw-prose-headings': theme('colors.charcoal'),
            '--tw-prose-links': theme('colors.ochre'),
            '--tw-prose-bold': theme('colors.charcoal'),
            maxWidth: 'none',
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75',
          },
        },
      }),
      fontFamily: {
        sans: ['Host Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Onest', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        // Brand primary colors
        charcoal: '#222121',
        ochre: '#85754E',
        sand: '#D0C7B3',
        terracotta: '#A45D44',

        // Semantic alias
        black: '#222121',
        white: '#FFFFFF',

        // Warm gray scale
        gray: {
          50: '#FAFAF9',
          100: '#F5F4F2',
          200: '#E8E6E1',
          300: '#D0C7B3',
          400: '#A8A095',
          500: '#85754E',
          600: '#666058',
          700: '#4A4540',
          800: '#333028',
          900: '#222121',
        },

        // Legacy aliases for compatibility
        'gray-light': '#F5F4F2',
        'gray-mid': '#E8E6E1',
        'gray-dark': '#666058',
      },
    },
  },
  plugins: [typography],
}
