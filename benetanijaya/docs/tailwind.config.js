module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#33B550',
          50: '#EBF8EE',
          500: '#33B550',
          700: '#289140',
        },
        secondary: {
          DEFAULT: '#F38524',
          50: '#FEF3E9',
          500: '#F38524',
          700: '#D66D13',
        },
        tertiary: {
          DEFAULT: '#137FC3',
          50: '#E7F2F9',
          500: '#137FC3',
          700: '#0E6197',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#4A4A4A',
          tertiary: '#9A9A9A',
        },
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '110%', fontWeight: '800' }],
        'display': ['48px', { lineHeight: '115%', fontWeight: '700' }],
        'h1': ['40px', { lineHeight: '120%', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '125%', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '130%', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '140%', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '140%', fontWeight: '600' }],
        'h6': ['16px', { lineHeight: '145%', fontWeight: '600' }],
        'body-xl': ['18px', { lineHeight: '140%', fontWeight: '400' }],
        'body-l': ['16px', { lineHeight: '140%', fontWeight: '400' }],
        'body-m': ['14px', { lineHeight: '155%', fontWeight: '400' }],
        'body-s': ['12px', { lineHeight: '150%', fontWeight: '400' }],
        'label-xl': ['16px', { lineHeight: '145%', fontWeight: '600' }],
        'label-l': ['14px', { lineHeight: '145%', fontWeight: '600' }],
        'label-m': ['12px', { lineHeight: '145%', fontWeight: '500' }],
        'label-s': ['11px', { lineHeight: '140%', fontWeight: '500' }],
      },
    },
  },
};