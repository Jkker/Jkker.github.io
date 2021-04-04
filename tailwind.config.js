const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js', './lib/**/*.js'],
    options: {
      safelist: ['type'], // [type='checkbox']
    },
  },
  important: true,
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        md: 'rgb(0 0 0 / 6%) 0px 9px 24px',
      },
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Lexend', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'ui-monospace', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        blue: colors.lightBlue,
        // blue: '#76d9e6',
        // 'blue-400': '#78dce8',
        code: {
          green: '#a9dc76',
          yellow: '#ffd866',
          orange: '#fc9867',
          purple: '#ab9df2',
          red: '#ff6188',
          blue: '#78dce8',
          white: '#fcfcfa',
        },
        gray: {
          // 300: '#c1c0c0',
          // 400: '#939293',
          // 500: '#727072',
          600: '#5b595c',
          700: '#2D2A2E',
          800: '#221F22',
          900: '#19181A',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
              code: { color: theme('colors.blue.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.red'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code:before': {
              content: 'none',
            },
            'code:after': {
              content: 'none',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            backgroundColor: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.400'),
              },
              code: { color: theme('colors.blue.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            code: {
              backgroundColor: theme('colors.gray.700'),
            },
            pre: {
              backgroundColor: theme('colors.gray.700'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
    extend: {
      opacity: ['dark'],
      boxShadow: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
