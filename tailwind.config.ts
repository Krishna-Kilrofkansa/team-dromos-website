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
                base: '#0F0F0F',
                accent: {
                    1: '#00E0FF', // Cyan
                    2: '#FF008C', // Pink
                },
                neutral: {
                    light: '#F5F5F5',
                    dark: '#CCCCCC',
                },
            },
            fontSize: {
                'h6': '1.25rem',
                'h5': '1.5625rem',
                'h4': '1.95rem',
                'h3': '2.441rem',
                'h2': '3.052rem',
                'h1': '3.815rem',
            },
            spacing: {
                '8': '8px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '64': '64px',
                '128': '128px',
                '256': '256px',
            },
            boxShadow: {
                'glow-cyan': '0 0 15px 5px rgba(0, 224, 255, 0.3)',
                'glow-pink': '0 0 15px 5px rgba(255, 0, 140, 0.3)',
            },
        },
    },
    plugins: [],
}
export default config
