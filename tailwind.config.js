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
