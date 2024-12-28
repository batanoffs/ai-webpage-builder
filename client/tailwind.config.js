/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundSize: {
                'button-icon': '20px 20px',
            },
            backgroundPosition: {
                'button-icon': 'center',
            },
            backgroundImage: {
                'button-icon': "url('./src/assets/send.svg')",
                'tab-preview': "url('/img/footer-texture.png')",
                'tab-code': "url('/img/footer-texture.png')",
            },
        },
    },
    plugins: [],
};
