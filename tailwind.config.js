/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "blue-rgba": "rgba(95, 195, 225, 1)",
                seagull: {
                    50: "#eefafd",
                    100: "#d5f1f8",
                    200: "#b0e3f1",
                    300: "#5fc3e1",
                    400: "#3cafd4",
                    500: "#2192b9",
                    600: "#1e769c",
                    700: "#1f5f7f",
                    800: "#215069",
                    900: "#204259",
                    950: "#102b3c",
                },
            },
            gridTemplateRows: {
                "grid-rows": "30px 200px 30px",
            },
            textColor: {
                "bluer-gba": "rgba(95, 195, 225, 1)",
            },
        },
    },
    plugins: [],
};
