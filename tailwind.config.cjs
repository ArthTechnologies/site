/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui"),require('@tailwindcss/typography')],

    daisyui: {
        themes: [
            {
                dark: {
                    ...require("daisyui/src/theming/themes")[
                        "dark"
                    ],
                    "color-scheme": "dark",
                    primary: "#088385",
                    "primary-content": "#ffffff",
                    secondary: "#cc4304",
                    "secondary-content": "#ffffff",
                    accent: "#1FB2A5",
                    "accent-content": "#ffffff",
                    neutral: "#191D24",
                    "neutral-content": "#A6ADBB",
                    "base-100": "#141b26",
                    "base-200": "#0a1421",
                    "base-300": "#040f1f",
                    "base-content": "#c0c6d1",
                    "text-base-content": "#ffffff",

                },
                light: {
                    ...require("daisyui/src/theming/themes")[
                        "light"
                    ],
                    primary: "#cc4304",
                    secondary: "#088385",
                    "base-100": "#e5dfd7",
                    "base-200": "#888888",
                    "base-300": "#aaaaaa",
                    

                },
            },
        ],
    },
}
