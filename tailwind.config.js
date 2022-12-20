module.exports = {

    content: [
        "./App.{js,jsx,ts,tsx}",
        "./<custom directory>/**/*.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
    extend: {
        colors: {
            'regal-blue': '#243c5a',
            'myColor': '#5cab44',

          },
    },
    },
    plugins: [],
}