module.exports = {
    mode: "jit",
    purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "background-main": "#f4f5f7",
                "background-sub": "#74b9ff",
                "background-danger": "#ff4757",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
