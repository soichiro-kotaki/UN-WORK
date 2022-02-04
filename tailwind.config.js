module.exports = {
    mode: "jit",
    purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "background-main": "#f4f5f7",
                "background-sub": "#74b9ff",
                "background-danger": "#ff4757",
                "normal-btn": "#37cdbe",
                "normal-btn-hover": "#2aa79b",
                "dark-screen": "#2f3542",
                "dark-content": "#57606f",
                "dark-text": "#dfe4ea",
                "dark-time": "#a4b0be",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
