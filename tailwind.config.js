const defaultTheme = require('tailwindcss/defaultConfig');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/**/**/*.jsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.jsx",
  ],
  important: true,
  theme: {
    ...defaultTheme,
    colors: {
      ...colors,
      primary: "#FF6C44",
      white: '#ffffff',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      grayMedium: '#E5E5E5',
      lightOrange: '#FFB29D',
      beige: '#FFEDE1',
      second:'#f7fafc',
      gradientBackground: '51% #CBCBCB',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'redTransparent': 'rgba(236, 76, 110, 25%)',
      'red': 'rgb(236, 76, 110)',
      'gray': 'rgba(7, 16, 47, 32%)',
      'gradient': 'rgba(203, 203, 203, 51%)',
      // EC4C6E
      text: {
        DEFAULT: "#1F2937",
        light: "#6C7281",
        'green': "#19777A",
      },
      light: {
        DEFAULT: "#FAFBFC",
        lighter: "#F3F4F6",
      },
    },
    extend: {
      linearGradient: {
        'custom-gradient': '51% #CBCBCB, 0% #777777',
      },
      minHeight:{
        'card-home-1': "270px",
      },
      minWidth:{
        'card-home-1': "490px",
      },
      width:{
        'button-card-1': "400px",
      },
      boxShadow: {
        'shadow-button': "2px 3px 4px 3px rgba(0, 0, 0, 0.2)",
      },
      minHeightImage: {  
        'card-home-2': "144px",
      },
      heightCardPedidos: {
        'card-home-pedidos': "770px",
      },
      heightCardOrder: {
        'card-home-order': "500px",
      },
      heightCardProdutos: {
        'card-produtos': "1090px",
      },
      widthCardProdutos: {
        'card-produtos': "594px",
      },
      heightCardProdutos: {
        'div-card': '97%',
      },
    },
  },
  plugins: [],
}
