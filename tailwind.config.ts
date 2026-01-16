
import type {Config} from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: 'var(--container-padding-x)',
    },
    extend: {
       gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
       },
       flex: {
         'fluid-item': '1 1 min(350px, 100%)',
       },
       spacing: {
        'fluid-xs': 'var(--space-fluid-xs)',
        'fluid-sm': 'var(--space-fluid-sm)',
        'fluid-md': 'var(--space-fluid-md)',
        'fluid-lg': 'var(--space-fluid-lg)',
        'fluid-xl': 'var(--space-fluid-xl)',
        'fluid-2xl': 'var(--space-fluid-2xl)',
       },
       fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.5vw + 0.6rem, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 1vw + 0.7rem, 1.125rem)',
        'fluid-base': 'clamp(1rem, 1.5vw + 0.75rem, 1.25rem)',
        'fluid-lg': 'clamp(1.5rem, 2.5vw + 1rem, 2.5rem)',
        'fluid-xl': 'clamp(2.25rem, 4.5vw + 1rem, 4rem)',
        'fluid-2xl': 'clamp(3rem, 6vw + 1rem, 5rem)',
        'fluid-hero': 'clamp(2.5rem, 8vw, 5rem)',
       },
       backgroundImage: {
        "grid-light": "linear-gradient(-90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
        "grid-dark": "linear-gradient(-90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      fontFamily: {
        headline: ['var(--font-serif)', 'Playfair Display', 'serif'],
        body: ['var(--font-sans)', 'Inter', 'sans-serif'],
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
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
        'infinite-scroll': {
          from: {transform: 'translateX(0)'},
          to: {transform: 'translateX(-100%)'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'infinite-scroll': 'infinite-scroll 50s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
