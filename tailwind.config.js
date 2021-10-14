module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      smooth: "hsl(252deg 19% 15%)",
      "chat-list": "rgb(37 35 49)",
      "chat-content": "rgb(37 35 49)",
      "message-item-sent": "#1b8be5",
      "message-item-receive": "#607d8b"
    }),
    fontFamily: {
      // sans: ['BlinkMacSystemFont', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {
      height: {
        730: "730px",
        "content-max": "970px",
      },
      borderRadius: {
        smooth: '20px',
        70: '70px',
        4: '4px',
      },
      borderColor: {
        'tiny': "rgba(249, 250, 251, 0.5);"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
