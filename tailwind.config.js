/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0066FF',
                    dark: '#0052CC',
                    light: '#3385FF',
                },
                secondary: {
                    DEFAULT: '#FF6B00',
                    dark: '#CC5500',
                    light: '#FF8533',
                },
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#EF4444',
                neutral: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            borderRadius: {
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
            },
            spacing: {
                '4': '4px',
                '8': '8px',
                '12': '12px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '48': '48px',
                '64': '64px',
                '96': '96px',
            },
            boxShadow: {
                'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
                DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.05)',
                'md': '0 6px 10px rgba(0, 0, 0, 0.05)',
                'lg': '0 10px 15px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
}