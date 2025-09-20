import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'space': ['Space Grotesk', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Futuristic custom colors
				neon: {
					purple: 'hsl(var(--neon-purple))',
					cyan: 'hsl(var(--neon-cyan))',
					blue: 'hsl(var(--neon-blue))'
				},
				space: {
					deep: 'hsl(var(--deep-space))',
					metallic: 'hsl(var(--metallic))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.8' },
					'50%': { opacity: '1' }
				},
				'hologram': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'scan': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100vw)' }
				},
				'slideInUp': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fadeInScale': {
					from: { opacity: '0', transform: 'scale(0.8)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(262 100% 65% / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(262 100% 65% / 0.8)' }
				},
				'matrix-drift': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)' },
					'25%': { transform: 'translate(-20px, -10px) rotate(5deg)' },
					'50%': { transform: 'translate(10px, -20px) rotate(-3deg)' },
					'75%': { transform: 'translate(-15px, 10px) rotate(2deg)' },
					'100%': { transform: 'translate(0, 0) rotate(0deg)' }
				},
				'gentle-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(262 100% 65% / 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(262 100% 65% / 0.6)',
						transform: 'scale(1.02)'
					}
				},
				'orbital-motion': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)' },
					'25%': { transform: 'translate(30px, -15px) rotate(90deg)' },
					'50%': { transform: 'translate(0, -30px) rotate(180deg)' },
					'75%': { transform: 'translate(-30px, -15px) rotate(270deg)' },
					'100%': { transform: 'translate(0, 0) rotate(360deg)' }
				},
				'grid-pulse': {
					'0%, 100%': { opacity: '0.1' },
					'50%': { opacity: '0.3' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 8s ease-in-out infinite alternate',
				'hologram': 'hologram 60s ease-in-out infinite',
				'float': 'float 12s ease-in-out infinite',
				'scan': 'scan 4s linear infinite',
				'slide-up': 'slideInUp 0.6s ease-out forwards',
				'fade-scale': 'fadeInScale 0.5s ease-out forwards',
				'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
				'matrix-drift': 'matrix-drift 20s ease-in-out infinite',
				'gentle-glow': 'gentle-glow 45s ease-in-out infinite',
				'orbital-motion': 'orbital-motion 30s linear infinite',
				'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
