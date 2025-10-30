import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#0a0a0a',
                    secondary: '#1a1a1a',
                    tertiary: '#2a2a2a'
                },
                primary: {
                    DEFAULT: '#00AEEF',
                    dark: '#0088cc',
                    light: '#33c1f0'
                },
                accent: {
                    cyan: '#00AEEF',
                    silver: '#B0BEC5',
                    neon: '#00ffff'
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#B0BEC5',
                    muted: '#6b7280'
                }
            },
            fontFamily: {
                'space': ['Space Grotesk', 'sans-serif'],
                'orbitron': ['Orbitron', 'monospace'],
                'inter': ['Inter', 'sans-serif']
            },
            fontSize: {
                'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'h1': ['2.5rem', { lineHeight: '1.3' }],
                'h2': ['2rem', { lineHeight: '1.4' }],
                'h3': ['1.5rem', { lineHeight: '1.5' }]
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out'
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(0, 174, 239, 0.3)' },
                    '100%': { boxShadow: '0 0 30px rgba(0, 174, 239, 0.6)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                }
            },
            backdropBlur: {
                xs: '2px'
            },
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(0, 174, 239, 0.4)',
                'glow-neon': '0 0 20px rgba(0, 255, 255, 0.4)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }
        },
    },
    plugins: [],
}
export default config
