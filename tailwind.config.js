module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}',"./node_modules/flowbite/**/*.js"],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'blue-indigo': {
                    500: '#1139AB',
                    700: '#052C9B',
                    900: '#042585'
                },
                success: '#10b981',
                danger: '#ef4444',
                warning: '#f59e0b',
                info: '#3b82f6',
                light: '#6b7280',
                dark: '#111827',
                'midnight': '#1139AB'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("daisyui"), require('flowbite/plugin')],
}
