/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                slideIn: {
                    '0%': { transform: 'scaleX(0)' },
                    '100%': { transform: 'scaleX(1)' },
                },
            },
            backgroundImage: {
                'button-icon': "url('./src/features/chat/assets/send.svg')",
            },
        },
    },
    plugins: [],
};
