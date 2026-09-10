
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
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
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
        'grid-light':
          'linear-gradient(-90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(-90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        wash: 'linear-gradient(165deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.07) 50%, hsl(var(--accent) / 0.05) 100%)',
      },
      boxShadow: {
        rest: 'var(--shadow-rest)',
        lift: 'var(--shadow-lift)',
        brand: '0 20px 50px -24px oklch(0.22 0.04 250 / 0.7)',
        'brand-lg': '0 40px 90px -50px oklch(0.18 0.03 170 / 0.9)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        quiet: 'var(--easing-standard, cubic-bezier(0.23, 1, 0.32, 1))',
      },
      fontFamily: {
        sans: ['var(--font-family-ui)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-family-ui)', 'Inter', 'sans-serif'],
        headline: ['var(--font-family-display)', 'Fraunces', 'Georgia', 'serif'],
        display: ['var(--font-family-display)', 'Fraunces', 'Georgia', 'serif'],
        editorial: ['var(--font-family-display)', 'Fraunces', 'Georgia', 'serif'],
        fraunces: ['var(--font-family-display)', 'Fraunces', 'Georgia', 'serif'],
        instrument: ['var(--font-family-editorial)', 'Instrument Serif', 'Georgia', 'serif'],
        ui: ['var(--font-family-ui)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
        jet: ['var(--font-family-code)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
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
        brand: {
          canvas: 'var(--color-lavender-300)',
          paper: 'var(--color-bg-band, #F4F2EA)',
          forest: 'var(--color-forest-950, #0F1F1C)',
          navy: 'var(--color-navy-900)',
          cream: 'var(--color-cream-50)',
          line: '#26344C',
          chartreuse: {
            400: 'var(--color-chartreuse-400)',
          },
          pulse: 'var(--color-pulse)',
        },
        verda: {
          bg: '#061310',
          deep: '#04100C',
          surface: '#0C1F19',
          raised: '#122A21',
          line: '#1D3B30',
          mint: '#4DE59B',
          mintDim: '#2FBF7C',
          mintWash: '#0E2A1F',
          text: '#E9F5EF',
          muted: '#8CA79B',
          faint: '#5C7469',
        },
        verdara: {
          paper: 'var(--color-paper-100)',
          paperAlt: 'var(--color-cream-100)',
          card: 'var(--color-paper-50)',
          ink: 'var(--color-forest-900)',
          inkDeep: 'var(--color-forest-950)',
          coral: 'var(--color-coral-500)',
          amber: 'var(--color-amber-400)',
          sky: 'var(--color-sky-300)',
          sage: 'var(--color-sage-300)',
          rule: 'var(--color-rule-200)',
          muted: 'var(--color-ink-muted)',
        },
        vista: {
          sand: '#C6A87F',
          sandLight: '#DCC49E',
          navy: 'var(--color-navy-900)',
          navySoft: '#152238',
          panel: '#111D30',
          cream: 'var(--color-cream-50)',
          line: '#26344C',
          muted: '#96A3B8',
          ember: '#D98C5F',
        },
        tessera: {
          forest: '#0F1F1C',
          pine: '#162B27',
          pineSoft: '#1C3531',
          lavender: 'var(--color-lavender-300)',
          chartreuse: 'var(--color-chartreuse-400)',
          citron: '#EDE57A',
          violet: '#A98BE8',
          paper: '#F4F2EA',
          muted: '#93A69F',
          line: '#264039',
        },
        chamfer: {
          paper: '#F8F3E9',
          paperLight: '#FDF9EF',
          tan: '#E7DDC9',
          amber: '#F2A413',
          orange: '#F04E23',
          rust: '#D9372A',
          ink: '#211D16',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
        '5xl': '2.5rem',
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
