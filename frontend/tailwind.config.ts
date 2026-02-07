import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // DialAI Brand Colors
                'dialai': {
                    'orange': '#FF8C42',
                    'orange-light': '#FFA366',
                    'orange-dark': '#E67A2E',
                    'blue': '#1E3A8A',
                    'blue-light': '#3B82F6',
                    'blue-gradient-start': '#0EA5E9',
                    'blue-gradient-end': '#1E3A8A',
                },
            },
            backgroundImage: {
                'gradient-brand': 'linear-gradient(135deg, #0EA5E9 0%, #1E3A8A 100%)',
                'gradient-orange': 'linear-gradient(135deg, #FFA366 0%, #FF8C42 100%)',
            },
        },
    },
    plugins: [],
}
export default config
