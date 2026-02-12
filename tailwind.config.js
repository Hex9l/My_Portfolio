/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#09090b',
                'text-primary': '#ededed',
                'text-secondary': '#a1a1aa',
                'accent-purple': '#8b5cf6',
                'accent-pink': '#ec4899',
                'primary-orange': '#fd6f00',
            },
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'spin-slow': 'spin 15s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient-x': 'background-pan 3s linear infinite',
                'dash': 'dash 1s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'background-pan': {
                    '0%': { backgroundPosition: '0% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                dash: {
                    to: {
                        strokeDashoffset: '-20',
                    },
                }
            }
        },
    },
    plugins: [],
}
