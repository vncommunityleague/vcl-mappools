/**
 * @type {import("tailwindcss").Config}
 */

module.exports = {
    content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                betvietnampro: "'Be Vietnam Pro'",
            },
            width: {
                100: "100rem",
            },
            maxWidth: {
                "8xl": "88rem",
                "9xl": "96rem",
            },
        },
    },
    plugins: [],
};
