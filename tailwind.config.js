/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}"], // Incluye todos los archivos relevantes dentro de "src"
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1300px',
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
        'xs': '.75rem',
        'sm': '0.857rem', //12px Small
        'base': '1rem', //14px Base
        'lg': '1.143rem', //16px Large
        'custom-xl': '1.286rem', //18px Custom XL
        'custom-xxl': '1.429rem', //20px Custom XXL
        'xl': '1.714rem', //24px Heading 04
        '2xl': '2.286rem', //32px Heading 03
        '3xl': '2.857rem', //40px Heading 02
        '4xl': '3.429rem', //48px Heading 01
        '5xl': '4.571rem', //64px Display 03
        '6xl': '5.143rem', //72px Display 02
        '7xl': '5.714rem', //80px Display 01
      },
    },
  },
  plugins: [],
};
