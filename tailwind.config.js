/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}"], // Incluye todos los archivos relevantes dentro de "src"
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1400px',
    },
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        accent: { // Color destinado a botones y links
          bg: '#FFE9C0',
          lighter: '#FFDA92',
          light: '#F8C158',
          DEFAULT: '#FAB42D',
          dark: '#E19E1C',
        },
        brand: { // Color destinado a fondos e iconos
          bg: '#E2DBFF',
          lighter: '#625499',
          light: '#322955',
          DEFAULT: '#1E1932',
          dark: '#15102C',
        },
        neutral: { // Color de texto
          bg: '#F5F5F5',
          lighter: '#E5E7EB',
          light: '#777',
          DEFAULT: '#333',
          dark: '#0F0F0F',
        },
        success: {
          bg: '#EEFFEA',
          lighter: '#7BCE6B',
          light: '#7BCE6B',
          DEFAULT: '#5BB949',
          dark: '#48943A',
        },
        danger: {
          bg: '#FEC8C6',
          lighter: '#F0A7A4',
          light: '#DE7874',
          DEFAULT: '#D2504B',
          dark: '#A8403B',
        },
      },
      fontSize: {
        'tiny': '0.714rem', //10px tiny
        'xs': '.75rem', //12px Small
        'sm': '0.875rem', //14px Small
        'base': '1rem', //16px Base
        'lg': '1.125rem', //18px Large
        'custom-xl': '1.188rem', //19px Custom XL
        'custom-xxl': '1.25rem', //20px Custom XXL
        'xl': '1.714rem', //24px Heading 04
        '2xl': '2.286rem', //32px Heading 03
        '3xl': '2.857rem', //40px Heading 02
        '4xl': '3.429rem', //48px Heading 01
        '5xl': '4.571rem', //64px Display 03
        '6xl': '5.143rem', //72px Display 02
        '7xl': '5.714rem', //80px Display 01
      },
      spacing: {
        '1': '0.25rem', // 4px
        '2': '0.5rem', // 8px
        '3': '0.75rem', // 12px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '7': '1.75rem', // 28px
        '8': '2rem', // 32px
        '9': '2.25rem', // 36px
        '10': '2.5rem', // 40px
        '12': '3rem', // 48px
        '14': '3.5rem', // 56px
        '16': '4rem', // 64px
        '20': '5rem', // 80px
        '24': '6rem', // 96px
        '28': '7rem', // 112px
        '32': '8rem', // 128px
        '36': '9rem', // 144px
        '40': '10rem', // 160px
        '44': '11rem', // 176px
        '48': '12rem', // 192px
        '52': '13rem', // 208px
        '56': '14rem', // 224px
        '60': '15rem', // 240px
        '64': '16rem', // 256px
        '72': '18rem', // 288px
        '80': '20rem', // 320px
        '96': '24rem', // 384px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};
